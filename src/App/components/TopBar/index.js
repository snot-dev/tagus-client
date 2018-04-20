import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import './topBar.css';

class TopBar extends Component {
    render() {
        return (
            <nav id="tagus-top-bar">
                <div id="tagus-nav-header-container">
                    <Link to="/home" id="tagus-nav-logo">
                        <img id="tagus-logo" src="logo/Tagus_Logo_White_Horizontal.svg" title="tagus" alt="tagus" />
                    </Link>
                </div>
                <div className="tagus-top-bar-container">
                    <div className="tagus-top-buttons-container">
                         <NavLink to='/home/profile' className="tagus-top-avatar tagus-top-button" title="profile" ><i className="fa fa-user"></i><span className="tagus-top-user-username">{this.props.user.username}</span></NavLink>
                         <a onClick={this.props.onLogoffClick} className="tagus-logoff-button tagus-top-button" title="log off"><i className="fa fa-power-off"></i></a>
                    </div>
                </div>
            </nav>
        );
    }
}

TopBar.propTypes = {
    user: PropTypes.object.isRequired,
    onLogoffClick: PropTypes.func.isRequired
};

export default TopBar;