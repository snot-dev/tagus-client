import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import Panel from '../../../../components/Panel';
import Overlay from '../../../../components/Overlay';
import List from '../../../../components/List';
import AddLink from '../../../../components/AddLink';
import ListItem from '../../../../components/ListItem';
import Modal from '../../../../components/Modal';
import CreateUnitMenu from './components/CreateUnitMenu';
import Delete from './components/Delete';
import store from '../../../../services/store';
import {createNewUnit, deleteUnit, clearContent} from '../../../../services/units/actions';
import './unitsList.css';

class UnitsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            creatingUnit: false,
            deleteUnit: null
        };
    }

    toggleCreatingUnit(state) {
        return () => {
            this.setState({
                creatingUnit: state
            });
        }
    }

    toggleDeleteModal(id) {
        return() => {
            this.setState({
                deleteUnit: id
            });
        };
    }

    _deleteUnit() {
        store.dispatch(deleteUnit(this.state.deleteUnit));

        this.setState({
            deleteUnit: null
        });
    }

    createUnit(values) {
        const newUnit = values.newUnit;
        
        store.dispatch(createNewUnit(newUnit));
        this.setState({
            creatingUnit: false
        });
    }

    _generateContentModalBody() {
        return this.props.content.map(con => ` ${con}`).toString();
    }

    _closeContentModal() {
        store.dispatch(clearContent());
    }

    render() {
        const menu = [
            <CreateUnitMenu key="createUnit" onSubmit={this.createUnit.bind(this)} show={this.state.creatingUnit} onClose={this.toggleCreatingUnit(false)} />
        ];

        return (
            <Panel title={this.props.name} className="col-xs-12 col-sm-4 full-height" menu={menu} >
                <List id="tagus-units-list" className="tagus-units-list">
                    {this.props.list && this.props.list.length > 0
                    ?   this.props.list.map((unit, key) => {
                            return (
                                <ListItem key={`${unit._id}_${key}`} className="tagus-unit-list-item">
                                    <NavLink to={`${this.props.url}/detail/${unit._id}`} activeClassName="active" className="tagus-list-item-link">
                                        <i className={`fa fa-file`} aria-hidden="true"></i>{unit.name}
                                    </NavLink>
                                    <Delete onClick={this.toggleDeleteModal(unit._id)} />
                                </ListItem>
                            );
                        })
                    :   null}
                </List>
                <Modal type="warning" show={!!this.state.deleteUnit} title="Warning!" body={"Are you sure you want to DELETE PERMANENTLY this Unit?"} closeButton={{onClick: this.toggleDeleteModal(false), text: "Cancel"}} confirmButton={{onClick:this._deleteUnit.bind(this), text: "Yes, I'm sure!"}} />
                <Modal type="error" show={this.props.content.length > 0} title="Error! This Unit is still being used in the following content:" body={this._generateContentModalBody()} closeButton={{onClick: this._closeContentModal.bind(this), text: "Close"}} />
                <AddLink text="Create new Unit" disabled={this.state.creatingUnit} onClick={this.toggleCreatingUnit(true)} />
                <Overlay show={this.props.fetchingList || this.props.savingDetail}/>
            </Panel>
        );
    }
}

UnitsList.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    fetchingList: PropTypes.bool.isRequired,
    savingDetail: PropTypes.bool.isRequired,
    content: PropTypes.array
};

export default UnitsList;   