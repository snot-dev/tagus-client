import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import {constants} from '../../../../services/constants';
import Panel from '../../../../components/Panel';
import Overlay from '../../../../components/Overlay';
import AddLink from '../../../../components/AddLink';
import Form from '../../../../components/Form';
import Modal from '../../../../components/Modal';
import AddTabMenu from './components/AddTabMenu';
import AddFieldMenu from './components/AddFieldMenu';
import DropdownOptionsMenu from './components/DropdownOptionsMenu';
import TemplatesList from './components/TemplatesList';
import TabsList from './components/TabsList';
import {getUnitDetailIfNeeded, getTemplatesIfNeeded, getUnitFieldsIfNeeded, resetUnit, saveUnit} from '../../../../services/units/actions';
import store from '../../../../services/store';
import {camelize} from '../../../../services/helpers';
import './unitsDetail.css';

class UnitDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            touched: false,
            addingTab: false,
            addingFieldTab: null,
            addingField: null,
            editingOptions: false,
            editingField: null,
            deletingField: null,
            editingTab: null,
            deletingTab: null,
            modalBodyText: null
        };

        this._fields = [{
            name: "Name",
            alias: "name",
            type: "text",
            required: true
        }];
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            store.dispatch(getUnitDetailIfNeeded(this.props.match.params.id));
        }

        store.dispatch(getUnitFieldsIfNeeded());
        store.dispatch(getTemplatesIfNeeded());


        this._defaultValues = {
            name: this.props.detail.name
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        const hasNeededUnit = !!nextProps.detail._id || nextProps.match.params.id !== this.props.detail._id;
        const templates = nextProps.templates !== this.props.templates || this.props.fetchingTemplates !== nextProps.fetchingTemplates;
        const unitFields = this.props.fetchingUnitFields !== nextProps.fetchingUnitFields;
        const addedOption = this.state.editingOptions !== nextState.editingOptions;
        
        return  hasNeededUnit || templates || unitFields || addedOption;
    }
    
    componentWillReceiveProps(nextProps) {
        const diffDetail = nextProps.detail._id && nextProps.detail._id !== this.props.detail._id;
        const noState = nextProps.detail._id && nextProps.detail.templates && !this.state.templates;

        if(diffDetail || noState) {
            this._resetState(false, nextProps);
        }
    }
    
    componentWillUpdate(nextProps) {
        if(nextProps.match.params.id !== this.props.match.params.id) {
            store.dispatch(getUnitDetailIfNeeded(nextProps.match.params.id));
        }

        this._defaultValues = {
            name: nextProps.detail.name
        };
    }   

    _resetUIState() {
        this.setState({
            addingTab: false,
            addingFieldTab: null,
            addingField: null,
            editingField: null,
            deletingField: null,
            editingTab: null,
            deletingTab: null,
            modalBodyText: null,
            touched: false
        });
    }

    _resetState(formTouched, nextProps) {
        const props = nextProps ||  this.props;
        const state = {
            touched: !!formTouched
        };

        if(props.detail.templates) {
            state.templates = props.detail.templates.slice(0);
        }
        
        if(props.detail.tabs) {
            state.tabs = _.cloneDeep(props.detail.tabs);
        }

        this.setState(state);
    }

    _onTemplatesChange(update) {
        if(!this.state.touched) {
            this.setState({
                touched: true,
                addingTab: false,
                addingFieldTab: null
            });
        }

        this._updateTemplates(update);
    }

    _updateTemplates(update) {
        const templates = this.state.templates.slice(0);

        if(update.value) {
            if(templates.indexOf())
            templates.push(update.name);
        }
        else {
            const index = templates.indexOf(update.name);
            templates.splice(index,1);
        }

        this.setState({
            templates
        });
    }

    _onCancelButton(id) {
        return () => {
            store.dispatch(resetUnit(id));
        }
    }

    _onReset(reset) {
        return () => {
            this._resetState(reset);
        }
    }    
    
    addTabClick() {
        if(!this.state.addingTab) {
            this.setState({
                addingTab: true
            })
        }
    }
    
    onTabFormSubmit(values) {
        const alias = camelize(values.tab.name);
        const tabs = this.state.tabs.slice(0);
        
        if(this.state.editingTab) {
            for(const tab of tabs) {
                if(tab.alias === this.state.editingTab.alias) {
                    tab.name = values.tab.name;
                    tab.alias = camelize(tab.name);
                    break;
                }
            }
        }
        else {
            const tab = {
                name: values.tab.name,
                alias,
                fields: []
            };

            tabs.push(tab);
        }

        this.setState({
            touched: true,
            addingTab: false, 
            addingFieldTab: null,
            editingTab: null,
            tabs: tabs
        });
    }
    
    addFieldClick(tab) {
        if(!this.state.addingFieldTab) {
            this.setState({
                addingFieldTab: tab 
            });
        }
    }
    
    onEditField(tab, field) {
        this.setState({
            addingFieldTab: tab,      
            editingField: field     
        })
    }
    
    onEditTab(tab) {
        this.setState({
            addingTab: true,
            editingTab: tab
        });
    }

    onToggleDeleteModal(tab, field) {
        let modalBodyText = null

        if(tab) {
            if(field) {
                modalBodyText = `Are you sure you want to delete ${field.name} from ${tab}?`;
            } 
            else {
                modalBodyText = `Are you sure you want to delete ${tab.name} and ALL of its fields?`;
            }
        }

        this.setState({
            deletingField: field,
            deletingTab: tab,
            modalBodyText
        });
    }

    onClickConfirmModal() {
        if(this.state.deletingField) {
            this.deleteField();
        }
        else if(this.state.deletingTab) {
            this.deleteTab();
        }
    }

    deleteTab() {
        let tabIndex = 0;
        const tabs = this.state.tabs.slice(0);

        for(let i = 0; i < tabs.length; i++) {
            if(tabs[i].alias === this.state.deletingTab.alias) {
                tabIndex = i;
                break;
            }
        }

        tabs.splice(tabIndex, 1);

        this.setState({
            touched: true,
            deletingField: null,
            deletingTab: null,
            tabs
        });
    }

    onFieldChange() {
        if (!this.state.touched) {
            this.setState({
                touched: true
            });
        }
    }

    deleteField() {
        let tabIndex = 0;
        let fieldIndex = 0;
        const tabs = this.state.tabs.slice(0);

        for(let i = 0; i < tabs.length; i++) {
            if(this.state.deletingTab === tabs[i].alias) {
                const tab = tabs[i];
                tabIndex = i;

                for(let j = 0; j < tab.fields.length; j++) {
                    if(tab.fields[j].alias === this.state.deletingField.alias) {
                        fieldIndex = j;
                        break;
                    }
                }
                break;
            }
        }

        tabs[tabIndex].fields.splice(fieldIndex, 1);

        this.setState({
            touched: true,
            deletingField: null,
            deletingTab: null,
            tabs
        });
    }

    onFieldFormSubmit(values) {
        const field = values.field;
        const tabs = _.cloneDeep(this.state.tabs);

        field.alias = camelize(field.name);
        field.required = !!values.required;
        
        if (field.type === 'dropdownList') {
            const stateField = this.state.addingField || this.state.editingField;
            field.options = stateField.options ? _.cloneDeep(stateField.options) : []
        } else {
            field.options = null;
            delete field.options;
        }

        for(const tab of tabs) {
            if(tab.alias === this.state.addingFieldTab) {
                if(this.state.editingField) {
                    for(let i = 0; i < tab.fields.length; i++) {
                        let tabField = tab.fields[i];

                        if(tabField.alias === this.state.editingField.alias) {
                            tab.fields[i] = field;
                            break;
                        }
                    }
                }
                else {
                    tab.fields.push(field);
                }
                break;
            }
        }

        this.setState({
            touched: true,
            tabs,
            addingFieldTab: null,
            addingTab: false,
            addingField: null,
            editingField: null,
            editingOptions: false
        });
    }

    saveUnit(form) {
        const unit = form ? form.unit : {};
        const detail = _.cloneDeep(this.props.detail);

        if(unit.name) {
            unit.alias = camelize(unit.name);
        }

        unit.tabs = this.state.tabs;
        unit.templates = this.state.templates;


        store.dispatch(saveUnit(Object.assign(detail, unit)));

        this._resetUIState();
    }    

    toggleAddOptionMenu(show) {
        return () => {
            this.setState({
                editingOptions: show
            });
        };
    }

    onOptionsSubmit(values) {
        const isNewField = !!this.state.addingField;
        const field = _.cloneDeep(isNewField ? this.state.addingField : this.state.editingField);
        const newState = {};

        field.options = values;
        
        if(isNewField) {
            newState.addingField = field;
        }
        else {
            newState.editingField = field;
        }

        newState.editingOptions = false;

        this.setState(newState);
    }

    onfieldBlur(formApi) {
        const addingField = formApi.values;

        this.setState({addingField});
    }

    _renderForm() {
        const created = moment(this.props.detail.created).format(constants.config.DATE_FORMAT);
        const edited = moment(this.props.detail.edited).format(constants.config.DATE_FORMAT);

        return (
            <div key={this.props.detail._id} className="container-fluid tagus-form-info-fields">
                <div className="row tagus-form-control">
                    <div className="col-xs-12 col-sm-6 tagus-form-field">
                        <label className="tagus-label" >Alias</label>
                        <p className="tagus-info">{this.props.detail.alias}</p>
                    </div>
                </div>
                <div className="row tagus-form-control">
                    <div className="col-xs-12 col-sm-6 tagus-form-field">
                        <label className="tagus-label" >Created By</label>
                        <p className="tagus-info">{this.props.detail.createdBy}</p>
                    </div>
                    <div className="col-xs-12 col-sm-6 tagus-form-field">
                        <label className="tagus-label" >Created</label>
                        <p className="tagus-info">{created}</p>
                    </div>
                </div>
                {this.props.detail.lastEditedBy
                ?   <div className="row tagus-form-control">
                    <div className="col-xs-12 col-sm-6 tagus-form-field">
                        <label className="tagus-label" >Last Edited By</label>
                        <p className="tagus-info">{this.props.detail.lastEditedBy}</p>
                    </div>
                    <div className="col-xs-12 col-sm-6 tagus-form-field">
                        <label className="tagus-label" >Edited</label>
                        <p className="tagus-info">{edited}</p>
                    </div>
                </div>
                :   null
                }
                <div className="row">
                    <Form disabled={!this.state.touched} onChange={this.onFieldChange.bind(this)} onReset={this._onReset(false)} onSubmit={this.saveUnit.bind(this)} name="unit" fields={this._fields} defaultValues={this._defaultValues} >
                        { this.props.templates  
                        ? <TemplatesList onChange={this._onTemplatesChange.bind(this)} templates={this.props.templates} unitTemplates={this.state.templates} />
                        :null
                    }
                        <TabsList onEditTab={this.onEditTab.bind(this)} onDeleteTab={this.onToggleDeleteModal.bind(this)} onDeleteField={this.onToggleDeleteModal.bind(this)} onEditField={this.onEditField.bind(this)} addFieldClick={this.addFieldClick.bind(this)} addingFieldTab={this.state.addingFieldTab} addingTab={this.state.addingTab} tabs={this.state.tabs || this.props.detail.tabs} />
                        <AddLink className="text-center" onClick={this.addTabClick.bind(this)} disabled={!!this.state.addingTab || !!this.props.addingField} text="Add a new Tab" />
                    </Form>
                </div>
            </div>
        );
    }

    render() {
        const menu = [
            <AddFieldMenu onFieldBlur={this.onfieldBlur.bind(this)} key='addFieldMenu' onAddOptionClick={this.toggleAddOptionMenu(true)} defaultValues={this.state.addingField || this.state.editingField} onClose={this._resetUIState.bind(this)} onSubmit={this.onFieldFormSubmit.bind(this)} unitFields={this.props.unitFields} tab={this.state.addingFieldTab} show={this.state.addingFieldTab && !this.state.addingTab} />,
            <AddTabMenu key='addTabMenu' defaultValues={this.state.editingTab} onClose={this._resetUIState.bind(this)} show={this.state.addingTab && !this.state.addingFieldTab} onSubmit={this.onTabFormSubmit.bind(this)} />,
            <DropdownOptionsMenu key="dopdownOptionsMenu" onOptionsSubmit={this.onOptionsSubmit.bind(this)} field={this.state.editingField} show={!!(this.state.editingOptions &&  (this.state.addingFieldTab || this.state.editingField))} onClose={this.toggleAddOptionMenu(false)}  />
        ];

        return (
            <Panel title={`${this.props.detail.name}`} className="col-xs-12 col-sm-8 full-height" menu={menu}>
                {this.props.detail._id  
                ?   this._renderForm() 
                :   null
                }
                <Overlay show={this.props.fetchingList || this.props.savingDetail}/>
                <Modal type='warning' title="Warning!" body={this.state.modalBodyText} show={!!this.state.deletingTab} confirmButton={{onClick:this.onClickConfirmModal.bind(this), text: "Delete!"}}  closeButton={{onClick: this.onToggleDeleteModal.bind(this, null), text: "Cancel"}} />
            </Panel>
        );
    }
}

UnitDetail.propTypes = {
    detail: PropTypes.object.isRequired,
    unitFields: PropTypes.array.isRequired,
    templates: PropTypes.array.isRequired,
    fetchingUnitFields: PropTypes.bool.isRequired,
    fetchingTemplates: PropTypes.bool.isRequired,
    addingTab: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    addingField: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default UnitDetail;   