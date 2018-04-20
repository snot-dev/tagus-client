import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Overlay from '../../../../components/Overlay';
import Panel from '../../../../components/Panel';
import Form from '../../../../components/Form';
import {createContent} from '../../../../services/content/actions';
import store from '../../../../services/store';
import './createContent.css';

class CreateContent extends Component {
    componentWillMount() {
        this.formFields = this.createFormFields(this.props.unit);
    }
    
    componentWillUpdate(props) {
        this.formFields = this.createFormFields(props.unit);
    }

    createFormFields(unit){
        const templates = this._convertToOptions(unit.templates);

        return  [
            {
                name: "Name",
                type: "text",
                alias: "name",
                required: true
            },
            {
                name: "Template",
                type: "select",
                alias: "template",
                options: templates,
                required: true,
            },
            {
                name: "Published",
                type: "checkbox",
                alias: "published"
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

    _createContentObject() {
        const content = {};

        for(const tab of this.props.unit.tabs) {
            content[tab.alias] = {};
        }

        return content;
    }

    onSubmit(formValues) {
        const newContent = formValues.newContent;
        
        if(this.props.parent) {
            newContent.parent = this.props.parent._id;
        }
        
        newContent.unitType = this.props.unit._id;
        newContent.url = this.props.parent ? this.props.parent.url : '/';
        newContent.content = this._createContentObject();

        store.dispatch(createContent(newContent));
    }

    render() {
        const title = this.props.parent ? `Create a new ${this.props.unit.name} under ${this.props.parent.name}` : `Create a new ${this.props.unit.name}`;
        return (
            <Panel title={title} className="col-xs-12 col-sm-8 full-height">
                <div className="container-fluid tagus-form-info-fields">
                    <div className="row tagus-form-control">
                        <div className="col-xs-12 col-sm-6 tagus-form-field">
                            <label className="tagus-label" >Unit</label>
                            <p className="tagus-info">{this.props.unit.name}</p>
                        </div>
                    </div>
                </div>
                <Form onSubmit={this.onSubmit.bind(this)} name={`newContent`} fields={this.formFields} />
                <Overlay show={this.props.savingContent}/>
            </Panel>
        );
    }
}

CreateContent.propTypes = {
    savingContent: PropTypes.bool.isRequired,
    unit: PropTypes.object.isRequired,
    parent: PropTypes.object.isRequired
};

export default CreateContent;