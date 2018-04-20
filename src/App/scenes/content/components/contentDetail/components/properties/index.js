import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from '../../../../../../components/Form';
import Modal from '../../../../../../components/Modal';
import {constants} from '../../../../../../services/constants';
import moment from 'moment';

class Properties extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showWarningModal: false,
            modalBody: '',
            formValues: {}
        };

        this.propertiesFields = [];
    }

    componentWillUpdate(newProps) {
        const templates = newProps.unit ?  this._convertToOptions(newProps.unit.templates) : [];
        
        this.propertiesFields = [
            {
                name: "Name",
                type: "text",
                alias: "name",
                required: true
            },
            {
                name: "Url",
                type: "text",
                alias: "url",
                required: true
            },
            {
                name: "Template",
                type: "select",
                alias: "template",
                options: templates,
                required: true
            },
            {
                name: "Partial",
                type: "select",
                alias: "partial",
                options: templates
            },
            {
                name: "Published",
                type: "checkbox",
                alias: "published"
            },
            {
                name: "Accessible",
                type: "checkbox",
                alias: "accessible"
            },
            {
                name: "Nav",
                type: "checkbox",
                alias: "nav"
            }
        ];
    }

    _convertToOptions(arr) {
        const options = [];

        for(const item of arr) {
            options.push({
                value: item,
                label: item
            });
        }

        return options;
    }

    _getPropertiesDefaultValues() {
        const defaultValues = {};

        for(const field of this.propertiesFields) {
            defaultValues[field.alias] = this.props.detail[field.alias];
        }

        
        return defaultValues;

    }

    _onSubmit(values) {
        if(values.properties.published !== this.props.detail.published) { 
            const body = this.props.detail.published ? 
            "Are you sure that you want to unpublish this content? That means this content won't be available access!" :
            "Are you sure that you want to publish this content? That means this content will be available access!";

            this.setState({
                showWarningModal: true,
                modalBody: body,
                formValues:values
            });
        } 
        else {
            if (this.props.onSubmit) {
                this.props.onSubmit(values);
            }
        }
    }

    _confirmModal() {
        if (this.props.onSubmit) {
            this.props.onSubmit(this.state.formValues);
        }

        this.setState({
            showWarningModal: false,
            modalBody: '',
            formValues: {}
        });
    }

    _toggleModal(show) {
        return () => {
            this.setState({
                showWarningModal: show,
                modalBody: '',
                formValues: {}
            });
        };
    }

    render() {
        const created = moment(this.props.detail.created).format(constants.config.DATE_FORMAT);
        const edited = moment(this.props.detail.edited).format(constants.config.DATE_FORMAT);

        return (
            <div className="row">
                <div className="col-xs-12">
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
                    {this._getPropertiesDefaultValues().name //hack to pass the defaultValues
                    ?   <Form disabled={this.props.disabled} onChange={this.props.onChange} onSubmit={this._onSubmit.bind(this)} name="properties" defaultValues={this._getPropertiesDefaultValues()} fields={this.propertiesFields} /> 
                    :null }

                    <Modal type='warning' show={this.state.showWarningModal} title="Warning!" body={this.state.modalBody} closeButton={{onClick: this._toggleModal(false), text: "Cancel"}} confirmButton={{onClick:this._confirmModal.bind(this), text: "Yes, I'm sure!"}} />
                </div>
            </div>
        )
    }
}

Properties.propTypes = {
    detail: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    onchange: PropTypes.func,
    onSubmit: PropTypes.func,
    unit: PropTypes.object.isRequired
};

export default Properties;