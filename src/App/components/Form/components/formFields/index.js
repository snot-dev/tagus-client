import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {StyledText, Checkbox, StyledSelect} from 'react-form';
import RichTextEditor from '../../../RichTextEditor';
import './formFields.css';

class FormFields extends Component {
    _getFieldType(field) {
        switch(field.type) {
            case'text':
                return {component: StyledText};
            case 'password':
                return {component: StyledText, type: 'password'}
            case 'checkbox':
            case 'trueOrFalse':
                return {component: Checkbox};
            case 'select': 
            case 'dropdownList':
                return {component: StyledSelect, options: field.options || []}
            case 'richTextEditor': 
                return {component: RichTextEditor};
            default:
                return {component: StyledText};
        }
    }

    _onFieldChange(field) {
        return (value) => {
            this.props.onFieldChange();

            if(value !== this.props.formApi.values[field.alias]) {
                this.props.formApi.setValue(field.alias, value);
            }

            if( field.onChange ) {
                field.onChange(value);
            }
        }
    }
    
    _onFieldBlur(field) {
        return (e) => {
            if( field.onBlur) {
                field.onBlur(this.props.formApi);
            }

            if(this.props.onFieldBlur) {
                this.props.onFieldBlur(this.props.formApi); 
            }
         };
    }

    _renderField(field) {
        const fieldType = this._getFieldType(field);
        
        const Component = fieldType.component;

        return (
            <div className="col-xs-12 tagus-form-field">
                <label className="tagus-label" htmlFor={field.alias}>{field.name}</label>
                <Component autoComplete="off" type={field.type} onBlur={this._onFieldBlur(field)} onChange={this._onFieldChange(field)} default={this.props.formApi.values[field.alias]} className={`tagus-input ${field.type}`}  field={field.alias} id={field.alias} options={fieldType.options} />                
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.props.fields.map((field, fieldIndex) => (
                    <div className="row tagus-form-control" key={`${field.alias}_${this.props.submits}_${fieldIndex}`}>
                        {this._renderField(field)}
                    </div>
                ))}
            </div>
        );
    };
}

FormFields.propTypes = {
    onFieldChange: PropTypes.func.isRequired,
    formApi: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    submits: PropTypes.number.isRequired
};

export default FormFields;
