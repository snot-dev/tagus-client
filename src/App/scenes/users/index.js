import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import UserList from './components/userList';
import UserDetail from './components/userDetail';
import {getUsersIfNeeded} from '../../services/users/actions';
import store from '../../services/store';

class Users extends Component {
    componentDidMount() {
        if (this.props.loggedUser.isAdmin ) {
            store.dispatch(getUsersIfNeeded());
        }
        else {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <section id="users" className="full-height col-xs-12">
                <UserList loggedUser={this.props.loggedUser} name={this.props.name} url={this.props.match.url} list={this.props.users.list} fetchingList={this.props.users.fetchingList} creatingUser={this.props.users.creatingUser} deletingUser={this.props.users.deletingUser} />
                <Route exact={false}  path={`${this.props.match.url}/:id`} render={(props)=>(<UserDetail {...props} savingDetail={this.props.users.savingDetail} detail={this.props.users.detail} loggedUser={this.props.loggedUser} />)} />
            </section>
        )
    }
}

Users.propTypes = {
    name: PropTypes.string.isRequired,
    loggedUser: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
      users: state.users
    };
  };
  
  export default connect(mapStateToProps)(Users);