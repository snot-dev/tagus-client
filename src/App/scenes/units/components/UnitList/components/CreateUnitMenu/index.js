import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from '../../../../../../components/Menu';
import Form from '../../../../../../components/Form';

class CreateUnitMenu extends Component {
    componentWillMount() {
        this.fields = [
            {
                name: "Name",
                alias: "name",
                type: "text",
                required: true
            }
        ]
    }
 
    _onClose() {
        if(this.props.show && this.props.onClose) {
            this.props.onClose()
        }
    }

    _onSubmit(values) {
        if(this.props.onSubmit) {
            this.props.onSubmit(values);
        }
    }

    render() {
        return (
            <Menu show={this.props.show} title="Create new Unit" className="tagus-unit-create col-xs-9" onCloseButton={this._onClose.bind(this)} >
                <Form onSubmit={this._onSubmit.bind(this)} name="newUnit" fields={this.fields}/>
            </Menu>
        );
    }
}

CreateUnitMenu.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func
};

export default CreateUnitMenu;