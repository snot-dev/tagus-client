import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import Panel from '../../../../components/Panel';
import List from '../../../../components/List';
import ListItem from '../../../../components/ListItem';
import AddLink from '../../../../components/AddLink';
import Modal from '../../../../components/Modal';
import Overlay from '../../../../components/Overlay';
import CreateUserMenu from './components/createUserMenu';
import {createUser, deleteUser} from '../../../../services/users/actions';
import store from '../../../../services/store';
import './userList.css';

class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            creatingUser: false,
            deleteUser: null
        };
    }

    _toggleDeleteModal(id) {
        return() => {
            this.setState({
                deleteUser: id
            });
        };
    }

    deleteUser() {
        if (this.state.deleteUser) {
            store.dispatch(deleteUser(this.state.deleteUser));
        }

        this.setState({
            deleteUser: null
        });
    }

    _toggleCreateUserMenu(creating) {
        return () => {
            this.setState({creatingUser: creating})
        };
    }

    onSubmitCreateUser(values) {
        const user = values.newUser;
        
        if (this.props.loggedUser.isAdmin) {
            store.dispatch(createUser(user));
        }

        this.setState({creatingUser: false})
    }

    _shouldRenderDelete(user) {
        const self = user._id !== this.props.loggedUser._id;
        const isCreator = user.isCreator;

        return self && !isCreator;
    }

    render() {
        const menu = [
            <CreateUserMenu key="createUser" show={this.state.creatingUser && this.props.loggedUser.isAdmin} onClose={this._toggleCreateUserMenu(false)} onSubmit={this.onSubmitCreateUser.bind(this)} />
        ]
        return (
            <Panel title={this.props.name} className="col-xs-12 col-sm-4 full-height" menu={menu}>
                <List id="tagus-users-list" className="tagus-users-list">
                    {this.props.list && this.props.list.length > 0
                    ?   this.props.list.map((user, key) => {
                            return (
                                <ListItem key={`${user._id}_${key}`} className="tagus-user-list-item" >
                                    <NavLink to={`${this.props.url}/${user._id}`} activeClassName="active" className="tagus-list-item-link">
                                        <i className={`fa fa-user`} aria-hidden="true"></i>{user.username}
                                    </NavLink>
                                    {this._shouldRenderDelete(user)
                                    ?   <div onClick={this._toggleDeleteModal(user._id)} className="tagus-user-list-delete">
                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                        </div>
                                    :   null
                                    }
                                    
                                </ListItem>
                            );
                        })
                    :   null}
                </List>
                <AddLink text="Create new User" show={this.props.loggedUser.isAdmin} disabled={this.props.creatingUser} onClick={this._toggleCreateUserMenu(true)} />
                <Modal type='warning' show={!!this.state.deleteUser} title="Warning!" body={"Are you sure you want to DELETE PERMANENTLY this User?"} closeButton={{onClick: this._toggleDeleteModal(null), text: "Cancel"}} confirmButton={{onClick:this.deleteUser.bind(this), text: "Yes, I'm sure!"}} />
                <Overlay show={this.props.fetchingList || this.props.creatingUser || this.props.deletingUser} />
            </Panel>
        );
    }
}

UserList.propTypes = {
    name: PropTypes.string.isRequired,
    loggedUser: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    fetchingList: PropTypes.bool.isRequired,
    creatingUser: PropTypes.bool.isRequired,
    deletingUser: PropTypes.bool.isRequired
};

export default UserList;