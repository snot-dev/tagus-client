import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from '../../../../../../components/Menu';
import Form from '../../../../../../components/Form';

class AddTabMenu extends Component {
    constructor(props) {
        super(props);

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
    
    render() {
        return (
            <Menu show={this.props.show} title="Add new Tab" className="col-xs-9 col-sm-6" onCloseButton={this._onClose.bind(this)} >
                <Form defaultValues={this.props.defaultValues} name="tab" fields={this.fields} onSubmit={this.props.onSubmit}/>
            </Menu>
        );
    }
}

AddTabMenu.propTypes = {
    defaultValues: PropTypes.object,
    onClose: PropTypes.func,
    show: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired
};

export default AddTabMenu;