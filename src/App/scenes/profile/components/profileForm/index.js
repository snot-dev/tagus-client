import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {constants} from '../../../../services/constants';
import Form from '../../../../components/Form';
import {updateProfile} from '../../../../services/profile/actions';
import store from '../../../../services/store';


class ProfileForm extends Component {
    constructor(props) {
        super(props);

        this.fields = [
            {
                type: 'text',
                name: 'Username',
                alias: 'username',
                required: true
            },
            {
                type: 'text',
                name: 'Name',
                alias: 'name',
                required: true
            },
            {
                type: 'text',
                name: 'Surname',
                alias: 'surname',
                required: true
            },

        ]
    }

    _getDefaultValues() {
        const values = {};

        for (const field of this.fields) {
            values[field.alias] = this.props.user[field.alias];
        }

        return values;
    }

    onSubmit(values) {
        const updatedUser = values.userProfile;
        updatedUser._id = this.props.user._id;
        
        store.dispatch(updateProfile(updatedUser));
    }

    render() {
        const created = moment(this.props.user.created).format(constants.config.DATE_FORMAT);

        return (
            <div className="container-fluid user-profile">
                <div className="row tagus-form-control">
                    <div className="col-xs-12 col-sm-6 tagus-form-field">
                        <label className="tagus-label" >Email</label>
                        <p className="tagus-info">{this.props.user.email}</p>
                    </div>
                    <div className="col-xs-12 col-sm-6 tagus-form-field">
                        <label className="tagus-label" >Created</label>
                        <p className="tagus-info">{created}</p>
                    </div>
                </div>
                <div className="row">
                    {this.props.user._id 
                    ?   <Form name="userProfile" defaultValues={this._getDefaultValues()} fields={this.fields} onSubmit={this.onSubmit.bind(this)} />
                    :   null }
                </div>
            </div>
        )
    }
}

ProfileForm.propTypes = {
    user: PropTypes.object.isRequired
};

export default ProfileForm;