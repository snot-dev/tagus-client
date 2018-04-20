import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './header.css'

class Header extends Component {
    render() {
        return (
            <div className="row header-container">
                <div className="col-xs-12 tagus-panel-header">
                    <h3>
                        {this.props.children}
                    </h3>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string
    ])
};

export default Header;