import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import {updateUser, getUserDetailIfNeeded} from '../../../../services/users/actions';
import {constants} from '../../../../services/constants';
import store from '../../../../services/store';
import Panel from '../../../../components/Panel';
import Overlay from '../../../../components/Overlay';
import AdminForm from './components/adminForm';

class UserDetail extends Component {
    componentDidMount() {
        if (this.props.match.params.id) {
            store.dispatch(getUserDetailIfNeeded(this.props.match.params.id));
        }
    }

    componentWillUpdate(newProps) {
        if (newProps.match.params.id !== this.props.match.params.id) {
            store.dispatch(getUserDetailIfNeeded(newProps.match.params.id));
        }
    }
    
    changeAdminPermissions(values) {
        const user = _.cloneDeep(this.props.detail);
        
        if(values.isAdmin !== user.isAdmin) {
            user.isAdmin = values.isAdmin;
    
            store.dispatch(updateUser(user));
        }
    }

    render() {
        const created = moment(this.props.detail.created).format(constants.config.DATE_FORMAT);
        const shouldRenderForm = !this.props.detail.isCreator && this.props.loggedUser.isCreator;

        return (
            <Panel title={`${this.props.detail.username}`} className="col-xs-12 col-sm-8 full-height" >
                <div className="container-fluid tagus-user-detail-info">
                    <div className="row tagus-form-control">
                        <div className="col-xs-12 col-sm-6 tagus-form-field">
                            <label className="tagus-label" >email</label>
                            <p className="tagus-info">{this.props.detail.email}</p>
                        </div>
                        <div className="col-xs-12 col-sm-6 tagus-form-field">
                            <label className="tagus-label" >Username</label>
                            <p className="tagus-info">{this.props.detail.username}</p>
                        </div>
                    </div>
                    <div className="row tagus-form-control">
                        <div className="col-xs-12 col-sm-6 tagus-form-field">
                            <label className="tagus-label" >Created</label>
                            <p className="tagus-info">{created}</p>
                        </div>
                        {this.props.detail.createdBy
                        ?   <div className="col-xs-12 col-sm-6 tagus-form-field">
                                <label className="tagus-label" >Created by</label>
                                <p className="tagus-info">{this.props.detail.createdBy}</p>
                            </div>
                        :   null}
                    </div>
                    <div className="row tagus-form-control">
                        <div className="col-xs-12 col-sm-6 tagus-form-field">
                            <label className="tagus-label" >Name</label>
                            <p className="tagus-info">{this.props.detail.name}</p>
                        </div>
                        <div className="col-xs-12 col-sm-6 tagus-form-field">
                            <label className="tagus-label" >Surname</label>
                            <p className="tagus-info">{this.props.detail.surname}</p>
                        </div>
                    </div>
                    {shouldRenderForm
                    ?   <div className="row tagus-form-control">
                            <AdminForm changePermissions={this.changeAdminPermissions.bind(this)} user={this.props.detail} />
                        </div>
                    :null }
                </div>
                <Overlay show={this.props.savingDetail} />
            </Panel>
        );
    }
}

UserDetail.propTypes = {
    detail: PropTypes.object.isRequired,
    loggedUser: PropTypes.object.isRequired,
    savingDetail: PropTypes.bool.isRequired
}

export default UserDetail;