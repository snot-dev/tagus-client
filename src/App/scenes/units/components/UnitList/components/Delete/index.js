import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './delete.css';

class Delete extends Component {
    _onClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        return (
            <div onClick={this._onClick.bind(this)} className="tagus-units-list-delete">
                <i className="fa fa-trash-o" aria-hidden="true"></i>
            </div>
        );
    }
}

Delete.propTypes = {
    onClick: PropTypes.func
};

export default Delete; 
