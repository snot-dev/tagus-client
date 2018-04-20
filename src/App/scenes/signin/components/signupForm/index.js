import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Form from '../../../../components/Form';
import store from '../../../../services/store';
import {createAdmin} from '../../../../services/auth/actions';


class SignupForm extends Component {
    constructor(props) {
        super(props);

        this.fields = [
            {
                name: 'Email',
                alias: 'email',
                type: 'text',
                required: true
            },
            {
                name: 'Username',
                alias: 'username',
                type: 'text',
                required: true
            },
            {
                name: 'Name',
                alias: 'name',
                type: 'text',
                required: true
            },
            {
                name: 'Surname',
                alias: 'surname',
                type: 'text',
                required: true
            },
            {
                name: 'Password',
                alias: 'password',
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

    onSubmit(values) {
        const user = values.register;

        store.dispatch(createAdmin(user));
    }

    onValidate(values, err) {
        const errors = _.clone(err);

        if(!err.password && !err.confirmPassword) {
            if (values.password.length <= 4) {
                errors.password = "This field must have more than 4 characters";
            }
            else if (values.password !== values.confirmPassword) {
                const errorMessage = "These fields must match";
                errors.password = errorMessage;
                errors.confirmPassword = errorMessage;
            } 
        }

        if(!err.email && !this._validateEmail(values.email)) {
            errors.email = "Email must be valid";
        }

        return errors;
    }

    _validateEmail(email){
        //https://stackoverflow.com/questions/43439895/js-ling-unnecessary-escape-character-no-useless-escape
        const reg = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        return reg.test(email.trim());
    }

    render() {
        return (
            <div className="row tagus-intro-form-container">
                <div className="row tagus-login-message-container">
                    <div className="col-xs-12">
                        <p className={`tagus-login-message`}>This is your first login! Please insert your information</p>
                    </div>
                </div>
                <div className="row">
                    <Form onValidate={this.onValidate.bind(this)} onSubmit={this.onSubmit.bind(this)} name="register" fields={this.fields} className="container-fluid" />
                </div>
            </div>
        );
    }
}
 
SignupForm.propTypes = {
    checkedInfo: PropTypes.bool,
    shouldInstall: PropTypes.bool
};

export default SignupForm;