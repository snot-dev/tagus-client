import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './listItem.css';

class ListItem extends Component {
    render() {
        const className = this.props.className || '';
        return (
            <li id={this.props.id} className={`tagus-list-item ${className}`}>
                {this.props.children}
            </li>
        );
    }
}

ListItem.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
};

export default ListItem;