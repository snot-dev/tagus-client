import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './overlay.css';

class Overlay extends Component {

    render() {
        const show = this.props.show ? "" : "hidden";
        return (
            <div className={`tagus-overlay ${show}`}>

            </div>
        )
    }
}

Overlay.propTypes = {
    show: PropTypes.bool
};

export default Overlay;