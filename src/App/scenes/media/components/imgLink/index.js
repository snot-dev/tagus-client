import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Popover, OverlayTrigger} from 'react-bootstrap';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './imgLink.css';

class ImgLink extends Component {
    _popover() {
        return (
            <Popover id="tagus-popover" className="tagus-gallery-popover" >
                src="<strong>{this.props.link}</strong>" <CopyToClipboard text={this.props.link}><i className="fa fa-clipboard copy" title="Copy to clipboard"></i></CopyToClipboard>
            </Popover> 
        );
    }

    render() {
        return (
            <OverlayTrigger trigger="click" rootClose placement="top" overlay={this._popover()}>
                <a className="tagus-gallery-image-link tagus-gallery-image-control-bar-icon"><i className="fa fa-link"></i></a>
            </OverlayTrigger>
        )
    }
}

ImgLink.propTypes = {
    link: PropTypes.string.isRequired
};

export default ImgLink;