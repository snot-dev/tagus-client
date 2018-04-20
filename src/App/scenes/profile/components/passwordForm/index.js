import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Form from '../../../../components/Form';
import {updatePassword} from '../../../../services/profile/actions';
import store from '../../../../services/store';

class PasswordForm extends Component {
    constructor(props) {
        super(props);

        this.fields = [
            {
                name: 'Old Password',
                alias: 'oldPassword',
                type: 'password',
                required: true
            },
            {
                name: 'New Password',
                alias: 'newPassword',
                type: 'password',
                required: true
            },
            {
                name: 'Confirm Password',
                alias: 'confirmPassword',
                type: 'password',
                required: true
            }
        ]
    }
    
    onSubmit(values, formApi) {
        store.dispatch(updatePassword(this.props.user._id, values.passwords));
        formApi.resetAll();
    }

    onValidate(values, err) {
        const errors = _.clone(err);

        if (!errors.oldPassword && !errors.newPassword && values.oldPassword === values.newPassword) {
            const errorMessage = "These fields can't match!";

            errors.oldPassword = errorMessage;
            errors.newPassword = errorMessage;
        }
        else if (!errors.newPassword && !errors.confirmPassword) {
            if (values.newPassword.length <= 4) {
                errors.newPassword = "This field must have more than 4 characters";
            }
            else if (values.newPassword !== values.confirmPassword) {
                const errorMessage = "These fields must match!";
                errors.newPassword = errorMessage;
                errors.confirmPassword = errorMessage;
            } 
        } 

        return errors;  
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit.bind(this)} onValidate={this.onValidate.bind(this)} name="passwords" fields={this.fields}/>
        )
    }
}

PasswordForm.propTypes = {
    user: PropTypes.object.isRequired
};

export default PasswordForm;