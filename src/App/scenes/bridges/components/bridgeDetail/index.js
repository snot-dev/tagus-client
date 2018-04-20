import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab} from 'react-bootstrap';
import moment from 'moment';
import {constants} from '../../../../services/constants';
import Panel from '../../../../components/Panel';
import Form from '../../../../components/Form';
import {getBridgeDetailIfNeeded, saveBridge} from '../../../../services/bridges/actions'; 
import store from '../../../../services/store'  ;
import Overlay from '../../../../components/Overlay';
import './bridgeDetail.css';

class  BridgeDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            key: 0
        };

        this.propertiesFields = [
            {
                name: "Name",
                type: "text",
                alias: "name",
                required: true
            }
        ];
    }

    componentDidMount() {
        if(this.props.match.params.id) {
            store.dispatch(getBridgeDetailIfNeeded(this.props.match.params.id));
        }
    }
    
    componentWillUpdate(newProps) {
        if(newProps.match.params.id !== this.props.match.params.id) {
            store.dispatch(getBridgeDetailIfNeeded(newProps.match.params.id));
        }
    }

    _handleTabchange(key) {
        this.setState({key});
    }

    _getPropertiesDefaultValues() {
        const defaultValues = {};

        for(const field of this.propertiesFields) {
            defaultValues[field.alias] = this.props.detail[field.alias];
        }

        return defaultValues;
    }
    
    _renderTabs(tabs) {
        const created = moment(this.props.detail.created).format(constants.config.DATE_FORMAT);
        const edited = moment(this.props.detail.edited).format(constants.config.DATE_FORMAT);

        return (
            <Tabs activeKey={this.state.key} onSelect={this._handleTabchange.bind(this)} id="tagus-bridges-tabs">
                {tabs.map((tab, index) => (
                            <Tab eventKey={index} title={tab.name} key={`${this.props.detail._id}_${tab.alias}_${index}`}>
                                <Form onSubmit={this.onSubmitContentBridge.bind(this)} name={tab.alias} defaultValues={this.props.detail.content[tab.alias]} fields={tab.fields} />
                            </Tab>
                        )
                    )
                }
                <Tab eventKey={tabs.length} key={`${this.props.detail._id}_Properties_${tabs.length}`} title='Properties'>
                    <div className="container-fluid tagus-form-info-fields">
                        <div className="row tagus-form-control">
                            <div className="col-xs-12 col-sm-6 tagus-form-field">
                                <label className="tagus-label" >Alias</label>
                                <p className="tagus-info">{this.props.detail.alias}</p>
                            </div>
                            <div className="col-xs-12 col-sm-6 tagus-form-field">
                                <label className="tagus-label" >Unit</label>
                                <p className="tagus-info">{this.props.unit.name}</p>
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
                    </div>
                    <Form onSubmit={this.onSubmitProperties.bind(this)} name="properties" defaultValues={this._getPropertiesDefaultValues()} fields={this.propertiesFields} /> 
                </Tab>
            </Tabs>
        )
    }
    
    onSubmitContentBridge(formValues) {
        const updatedBridge = Object.assign(this.props.detail, {content: formValues});
        store.dispatch(saveBridge(updatedBridge));
    }

    onSubmitProperties(formValues) {
        const updatedBridge = Object.assign(this.props.detail, formValues.properties);
        store.dispatch(saveBridge(updatedBridge));
    }

    render() {
        return (
            <Panel title={this.props.detail.name} className="col-xs-12 col-sm-8 full-height">
                {
                    this.props.unit
                    ? this._renderTabs(this.props.unit.tabs)
                    : null
                }
                <Overlay show={this.props.savingDetail || this.props.fetchingDetail}/>
            </Panel>
        )
    }
}

BridgeDetail.propTypes = {
    savingDetail: PropTypes.bool.isRequired,
    fetchingDetail: PropTypes.bool.isRequired,
    detail: PropTypes.object.isRequired,
    unit: PropTypes.object
};

export default BridgeDetail;