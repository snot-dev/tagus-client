import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {uploadMedia} from '../../../../services/media/actions';
import store from '../../../../services/store';
import './inputFile.css';

class InputFile extends Component {
    _onChange(e) {
        if (!this.props.uploadingMedia) {
            store.dispatch(uploadMedia(e.target.files[0]));
        }
    }

    render() {
        const text = this.props.uploadingMedia ? "Uploading..." : "Add Media";
        
        return (
            <span className="tagus-media-input">
                <label htmlFor="tagus-media-input-file" className="tagus-media-input-label"><i className="fa fa-upload tagus-media-input-icon"></i>{text}</label>
                <input disabled={this.props.uploadingMedia} onChange={this._onChange.bind(this)} type="file" accept="image/*" id="tagus-media-input-file" name="tagus-media" />
            </span>
        );
    }
}

InputFile.propTypes = {
    uploadingMedia: PropTypes.bool.isRequired
};

export default InputFile;