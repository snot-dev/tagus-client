import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from '../../../../../../components/Menu';
import Form from '../../../../../../components/Form';
import './createBridgeMenu.css';

class CreateBridgeMenu extends Component {
    constructor(props) {
        super(props);

        this.fields = [
            {
                name: "Name",
                alias: "name",
                type: "text",
                required: true
            },
            {
                name: "Unit",
                alias: "unitType",
                type: "select",
                options: [],
                required: true
            }
        ];
    }
    
    componentWillUpdate() {
        const units = this.props.units ? this._convertToOptions(this.props.units) : null;

        this.fields = [
            {
                name: "Name",
                alias: "name",
                type: "text",
                required: true
            },
            {
                name: "Unit",
                alias: "unitType",
                type: "select",
                options: units,
                required: true
            }
        ];
    }
 
    _convertToOptions(arr) {
        const units = [];
        
        for(const key in this.props.units) {
            if(this.props.units.hasOwnProperty(key)) {
                const unit = this.props.units[key];
                units.push(
                    {
                        label: unit.name,
                        value: unit._id 
                    }
                );
            }
        }

        return units;
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
            <Menu show={this.props.show} title="Create new Bridge" className="tagus-unit-create col-xs-9" onCloseButton={this._onClose.bind(this)} >
                <Form onSubmit={this._onSubmit.bind(this)} name="newBridge" fields={this.fields}/>
            </Menu>
        );
    }
}

CreateBridgeMenu.propTypes = {
    units: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default CreateBridgeMenu;