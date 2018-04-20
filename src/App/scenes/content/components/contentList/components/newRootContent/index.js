import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from '../../../../../../components/Menu';
import {createUnit} from '../../../../../../services/content/actions';
import store from '../../../../../../services/store';
import {Link} from 'react-router-dom';

class NewRootContent extends Component {

    _getUnitsList() {
        const units = [];
        
        for(const key in this.props.units) {
            if(this.props.units.hasOwnProperty(key)) {
                const unit = this.props.units[key];
                units.push(
                    <li className="tagus-menu-item" key={key}><Link onClick={this.onLinkClick(unit)} to={`${this.props.url}/create/${unit._id}`} className="tagus-menu-link">{unit.name}</Link></li>
                );
            }
        }

        return(
            <ul className="tagus-menu-list row">
                {units}
            </ul>
        )
    }


    onLinkClick(unit) {
        return() => {
            store.dispatch(createUnit(unit));
        };
    }

    _render() {
        return (
            <Menu onCloseButton={this.props.onCloseButton} title="Menu" className="col-xs-6 content-menu">
                {this._getUnitsList()}
            </Menu>
        );
    }

    render() {
        return (
            this.props.show ? this._render() : null
        );
    }
}

NewRootContent.propTypes = {
    units: PropTypes.object,
    onCloseButton: PropTypes.func,
    url: PropTypes.string.isRequired,
    show: PropTypes.bool
};

export default NewRootContent;