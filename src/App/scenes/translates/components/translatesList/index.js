import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Panel from '../../../../components/Panel';
import Modal from '../../../../components/Modal';
import AddLink from '../../../../components/AddLink';
import Overlay from '../../../../components/Overlay';
import FormButtons from '../../../../components/FormButtons';
import store from '../../../../services/store';
import {saveTranslates} from '../../../../services/translates/actions';
import './translateList.css';

class TranslatesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            touched: false,
            submited: false,
            timesSubmited:0,
            valid: true,
            errorMessage: '',
            translates: [],
            showWarningModal: false
        };
    }

    componentWillReceiveProps(props) {
        if (Object.keys(props.list).length > 0 && !this.state.touched && !this.state.submited) {
            this.setState({
                translates: this._convertKeyValueToArray(props.list)
            }); 
        }
    }

    _toggleWarningModal(show) {
        return () => {
            this.setState({
                showWarningModal:show
            });
        }
    }

    _onChange() {
        const state = {};
        if(!this.state.touched) {
            state.touched = true;
        }

        if (!this.state.valid) {
            state.valid = true;
        }

        if (Object.keys(state).length > 0) {
            this.setState(state);
        }
    }

    _onBlur(index) {
        return (e) => {
            const translates = _.cloneDeep(this.state.translates);

            translates[index][e.target.name] = e.target.value;

            this.setState({
                translates
            });
        }
    }

    _convertKeyValueToArray(listObj){
        const arr = [];

        for(const k in listObj) {
            arr.push({
                key: k,
                value: listObj[k]
            });
        }

        return arr;
    }

    _addNewTranslate() {
        const translates = _.cloneDeep(this.state.translates);

        translates.push({
            key: '',
            value: ''
        });

        this.setState({translates, touched: true});
    }

    _onDelete(index) {
        return () => {
            const translates = _.cloneDeep(this.state.translates);

            translates.splice(index, 1);

            this.setState({
                translates,
                touched:true,
                valid: true
            });
        }
    }

    _validate() {
        const translates = {};

        for (const item of this.state.translates) {
            if (translates[item.key]) {
                this.setState({
                    valid: false,
                    errorMessage: 'You cannot have two similar keys!',
                    touched: false
                });
                return null;
            }
            else if (!item.key || !item.value) {
                this.setState({
                    valid: false,
                    errorMessage: 'Every translate should have a key and a value filled!',
                    touched: false
                });
                return null;
            }
            else {
                translates[item.key] = item.value;
            }
        }

        this._saveTranslates(translates);
    }

    _resetState() {
        this.setState({
            touched: false,
            submited: false,
            timesSubmited:0,
            valid: true,
            errorMessage: '',
            translates: this._convertKeyValueToArray(this.props.list),
            showWarningModal: false
        });
    }

    _saveTranslates(translates) {
        this.setState({
            timesSubmited: this.state.timesSubmited+1,
            submited: true,
            touched: false,
            valid: true,
            errorMessage: '',
            showWarningModal: false
        });
        store.dispatch(saveTranslates(translates));
    }

    render() {
        return (
            <Panel title={this.props.name} className="col-xs-12 col-sm-6 full-height">
                <div className="container-fluid tagus-translates-list">
                {!this.state.valid 
                    ?  <div className="row"> <p className="tagus-translates-list-error col-xs-12">{this.state.errorMessage}</p> </div>
                    : null }
                    {this.state.translates.map((translate, index) => {
                        return (
                            <div key={`${index}_${translate.key}`} className="row tagus-translates-list-item">
                               <div className="tagus-translates-list-item-delete">
                                        <a onClick={this._onDelete(index)} className="tagus-translates-list-item-delete-icon">
                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                        </a>
                                    </div>                                <div className="col-xs-6">
                                    <label htmlFor="key" className="tagus-label tagus-translate-list-item-key">Key</label>
                                    <input name="key" type='text' className="tagus-input tagus-translate-input" onChange={this._onChange.bind(this)} onBlur={this._onBlur(index)} defaultValue={translate.key}  />
                                </div>
                                <div className="col-xs-6">
                                    <label htmlFor="value" className="tagus-label tagus-translate-list-item-key">Value</label>
                                    <input name="value" type='text' className="tagus-input tagus-translate-input" onChange={this._onChange.bind(this)} onBlur={this._onBlur(index)} defaultValue={translate.value} />
                                </div>
                            </div>
                        );
                    })}
                    <AddLink onClick={this._addNewTranslate.bind(this)} text="Add new translate" />
                    <FormButtons disabled={!this.state.touched} onSubmit={this._validate.bind(this)} onReset={this._toggleWarningModal(true)} />
                </div>
                <Modal type='warning' title="Warning!" body="Are you sure you want to discard all changes?" show={this.state.showWarningModal} confirmButton={{onClick:this._resetState.bind(this), text: "Discard Changes!"}}  closeButton={{onClick: this._toggleWarningModal(false), text: "Cancel"}} />
                <Overlay show={this.props.fetchingList || this.props.savingList} />
            </Panel>
        )
    }
}

TranslatesList.propTypes = {
    name: PropTypes.string.isRequired,
    list: PropTypes.object.isRequired,
    fetchingList: PropTypes.bool.isRequired,
    savingList: PropTypes.bool.isRequired
};

export default TranslatesList;