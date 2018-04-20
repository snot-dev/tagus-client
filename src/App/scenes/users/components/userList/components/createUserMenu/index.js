import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from '../../../../../../components/Menu';
import Form from '../../../../../../components/Form';

class CreateUserMenu extends Component {
    constructor (props) {
        super(props);

        this.fields = [
            {
                name: "Email",
                alias: "email",
                type: "text",
                required: true
            },
            {
                name: "Username",
                alias: "username",
                type: "text",
                required: true
            }
        ]
    }

    _onClose() {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    _onSubmit(values) {
        if (this.props.onSubmit) {
            this.props.onSubmit(values);
        }
    }

    render(){
        return (
            <Menu show={this.props.show} title="Create new User" className="tagus-user-create col-xs-9" onCloseButton={this._onClose.bind(this)} >
                <Form onSubmit={this._onSubmit.bind(this)} name="newUser" fields={this.fields}/>
            </Menu>
        );
    }
}

CreateUserMenu.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func,       
    onSubmit: PropTypes.func       
};

export default CreateUserMenu;