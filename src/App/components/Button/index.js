import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './button.css';

class Button extends Component {
    _onClick() {
        if (this.props.onClick && !this.props.disabled) {
            this.props.onClick();
        }
    }
    
    render() {
        const type = this.props.type || 'default';
        const className = this.props.className || '';

        return (
            <button disabled={!!this.props.disabled} onClick={this._onClick.bind(this)} className={`button ${type} ${className}`} >{this.props.children}</button>
        );
    }
}

Button.prototypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
};

export default Button;
