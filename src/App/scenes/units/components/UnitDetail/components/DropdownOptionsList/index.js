import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddLink from '../../../../../../components/AddLink';
import './dropdownOptionsList.css';

class DropdownOptionsList extends Component {
    renderOptions() {
        return(
            <ul className="tagus-drowpdown-options-list col-xs-12">
                <div className="tagus-dropdown-options-list-overlay">
                    <a onClick={this.props.onAddOptionClick} className="tagus-dropdown-options-list-overlay-button">
                        <div className="tagus-dropdown-options-list-overlay-button-icon">
                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </div>
                    </a>
                </div>

                {this.props.options.map((option, index) => {
                    return (
                        <li key={index} className="tagus-drowpdown-options-list-item row">
                            <div className="col-xs-12 col-sm-6">
                                <label className="tagus-label">Label:</label>{option.label}
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <label className="tagus-label">Value:</label>{option.value}
                            </div>
                        </li>
                    );
                })}
            </ul>
        )
    }

    render() {
        return(
            <div className="tagus-dropdown-options-list col-xs-12">
                <div className="row">
                    <label className="tagus-label">Options</label>
                    {this.props.options && this.props.options.length > 0 
                    ?   this.renderOptions()
                    :   <AddLink text="Add new Option" onClick={this.props.onAddOptionClick} disabled={false} />
                    }
                </div>
            </div>
        );
    }
}

DropdownOptionsList.propTypes = {
    options: PropTypes.array.isRequired,
    onAddOptionClick: PropTypes.func.isRequired
};

export default DropdownOptionsList;