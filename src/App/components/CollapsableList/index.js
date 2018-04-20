import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Collapse} from 'react-bootstrap';
import './collapsableList.css';

class CollapsableList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }

    componentWillMount() {
        if( typeof this.props.open !== 'undefined'){
            this.setState({
                open: this.props.open
            });
        }
    }

    _onClick(){
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        const className = this.props.className || '';
        const open = this.state.open ? ' open' : '';
        const buttonClass = this.state.open ? 'minus' : 'plus';
        const buttonContent = this.props.buttonChildren || <i className={`fa fa-${buttonClass}`}></i>

        return(
            <div className={`tagus-collapsable-list ${className}`}>
                {this.props.parent}
                <a className={`tagus-collapsable-list-button${open}`} onClick={this._onClick.bind(this)}>{buttonContent}</a>
                <Collapse in={this.state.open}>
                    {this.props.children}
                </Collapse>
            </div>
        );
    }
}

CollapsableList.propTypes = {
    className: PropTypes.string,
    buttonChildren: PropTypes.object,
    children: PropTypes.object.isRequired,
    parent: PropTypes.object
}

export default CollapsableList;