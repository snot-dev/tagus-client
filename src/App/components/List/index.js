import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './list.css';

class List extends Component {
    render() {
        const className = this.props.className || '';
        return (
            <ul id={this.props.id} className={`tagus-list ${className}`}>
                {this.props.children}
            </ul>
        );
    }
}

List.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    children: PropTypes.array
};

export default List;