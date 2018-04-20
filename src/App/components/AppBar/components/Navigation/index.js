import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './navigation.css';

class Navigation extends Component {
    render() {
        return (
            <div className="tagus-navigation">
                <p className="tagus-navigation-header">{this.props.title}</p>
                <ul className="tagus-menu-list">
                    {this.props.children}
                </ul>
            </div>
        );
    }
}

Navigation.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired
};

export default Navigation;