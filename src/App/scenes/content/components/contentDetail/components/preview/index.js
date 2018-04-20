import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import './preview.css';

class Preview extends Component {
    _onClick() {
        const cookies = new Cookies();
        cookies.set(`preview_${this.props.id}`, 'true', {path:'/', maxAge: 5});

        //TODO: Change this to actual address!
        window.open(`http://localhost:3001/tagus/preview/${this.props.id}`, '_blank');
    }

    _render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <button onClick={this._onClick.bind(this)} className="button preview info pull-right"><i className="fa fa-eye"></i>Preview</button>
                </div>
            </div>
        );
    }

    render () {
        return (
            this.props.id ? this._render() : null
        );
    }
}

Preview.propTypes = {
    id: PropTypes.string
};

export default Preview;