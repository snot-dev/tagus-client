import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './tabField.css';

class TabField extends Component {
    _onEditClick(field) {
        return () => {
            this.props.onEditField(this.props.tab, field);
        }
    }

    _onDeleteClick(field) {
        return () => {
            this.props.onDeleteField(this.props.tab, field)
        }
    }

    render() {
        return(
                <div  className="row tagus-form-field tagus-unit-field" >
                    <div className="tagus-unit-field-options">
                        <a onClick={this._onEditClick(this.props.field)} className="tagus-unit-field-option tagus-unit-field-edit-button">
                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </a>
                        <a onClick={this._onDeleteClick(this.props.field)} className="tagus-unit-field-option tagus-unit-field-edit-button">
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </a>
                    </div>
                    <div className="col-xs-12 col-sm-6" >
                        <label className="tagus-label">Name</label>
                        <p className="tagus-info">{this.props.field.name}</p>
                    </div>
                    <div className="col-xs-12 col-sm-6" >
                        <label className="tagus-label">Type</label>
                        <p className="tagus-info">{this.props.field.type}</p>
                    </div>
                    <div className="col-xs-12 col-sm-6" >
                        <label className="tagus-label">Alias</label>
                        <p className="tagus-info">{this.props.field.alias}</p>
                    </div>
                    <div className="col-xs-12 col-sm-6" >
                        <label className="tagus-label">Required</label>
                        <p className="tagus-info">{this.props.field.required.toString()}</p>
                    </div>
                </div>
        );
    }
}

TabField.propTypes = {
    onDeleteField: PropTypes.func.isRequired,
    onEditField: PropTypes.func.isRequired,
    field: PropTypes.object.isRequired,
    tab: PropTypes.string.isRequired
};

export default TabField;