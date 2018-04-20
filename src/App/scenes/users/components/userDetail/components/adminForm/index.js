import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../../../components/Modal'

class AdminForm extends Component {
    constructor(props) {
        super (props);

        this.state = {
            touched: false
        };
    }

    componentWillMount(props) {
        this._resetState();
    }

    _onChange(e) {
        this.setState({
            touched: true,
            checked: e.target.checked
        });
    }

    _resetState() {
        this.setState({
            checked: this.props.user.isAdmin,
            touched: false
        });
    }

    _confirmChange() {
        this.setState({
            touched: false
        });

        if (this.props.changePermissions) {
            this.props.changePermissions({isAdmin: this.state.checked});
        }
    }

    render() {
        return (
            <div className="col-xs-12 tagus-form-field">
                <label className="tagus-label" htmlFor="tagus-user-isAdmin">is Admin</label>
                <input checked={this.state.checked} onChange={this._onChange.bind(this)} type="checkbox" className="tagus-input checkbox" id="tagus-user-isAdmin" />                
                <Modal type='warning' show={this.state.touched} title="Warning!" body={"Are you want to change this user's permissions?"} closeButton={{onClick: this._resetState.bind(this), text: "Cancel"}} confirmButton={{onClick:this._confirmChange.bind(this), text: "Yes, I'm sure!"}} />
            </div>
        );
    }
}

AdminForm.propTypes = {
    changePermissions: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default AdminForm;