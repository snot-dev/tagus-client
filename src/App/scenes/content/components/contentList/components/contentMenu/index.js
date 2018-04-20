import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../../../components/Modal';
import Menu from '../../../../../../components/Menu';
import CollapsableList from '../../../../../../components/CollapsableList';
import {createUnit, deleteContent} from '../../../../../../services/content/actions';
import store from '../../../../../../services/store';
import {Link} from 'react-router-dom';
import './contentMenu.css';

class ContentMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            deleteMode: false
        };
    }

    onClick() {
        this.setState({
            open: !this.state.open
        });
    }

    onLinkClick(unit) {
        return() => {
            store.dispatch(createUnit(unit));
        };
    }

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

    _toggleModal(show) {
        return() => {
            this.setState({
                deleteMode: show
            });
        };
    }

    _deleteContent() {
        this.setState({deleteMode:false});
        store.dispatch(deleteContent(this.props.detail._id));
        this.props.history.push(this.props.url);
    }

    render() {
        const show = !!this.props.detail;
        const button = show ? <div onClick={this.onClick.bind(this)} className="tagus-menu-link">Add child to {this.props.detail.name}</div> : null;
        return (
            <Menu show={show} onCloseButton={this.props.onCloseButton} title="Menu" className="col-xs-9 col-sm-6 content-menu">
                <ul className="tagus-menu-list row">
                    <li className="tagus-menu-item">
                        <CollapsableList buttonChildren={button}>
                            <div className="col-xs-12">
                                {this._getUnitsList()}
                            </div>
                        </CollapsableList>
                    </li>
                    <li className="tagus-menu-item"><a onClick={this._toggleModal(true).bind(this)} className="tagus-menu-link">Delete</a></li>
                </ul>
                <Modal type='warning' show={this.state.deleteMode} title="Warning!" body={"Are you sure you want to DELETE PERMANENTLY this page and all the children?"} closeButton={{onClick: this._toggleModal(false), text: "Cancel"}} confirmButton={{onClick:this._deleteContent.bind(this), text: "Yes, I'm sure!"}} />
            </Menu>
        );
    }
}

ContentMenu.propTypes = {
    className: PropTypes.string,
    detail: PropTypes.object,
    history: PropTypes.object.isRequired,
    onCloseButton: PropTypes.func,
    savingContent: PropTypes.bool.isRequired,
    units: PropTypes.object.isRequired,
    url: PropTypes.string
};

export default ContentMenu;