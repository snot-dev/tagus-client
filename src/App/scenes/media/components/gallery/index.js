import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-images';
import Modal from '../../../../components/Modal';
import ImgLink from '../imgLink';
import InputFile from '../inputFile';
import {deleteMedia} from '../../../../services/media/actions';
import store from '../../../../services/store';
import './gallery.css';

class Gallery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentImage: 0,
            isLightBoxOpen: false,
            showLink: false,
            deleteMode: null
        };
    }

    toggleLightBox(show) {
        return () => {
            this.setState({
                isLightBoxOpen: false
            });
        }
    }

    setImage(img) {
        return () => {
            this.setState({
                isLightBoxOpen: true,
                currentImage: img
            });
        };
    }

    gotoNextLightboxImage() {
       this.setState({
            currentImage: this.state.currentImage +1 % this.props.images.length
       }); 
    }

    gotoPrevLightboxImage() {
        this.setState({
             currentImage: this.state.currentImage -1 % this.props.images.length
        }); 
     }

     _toggleModal(img) {
         return () => {
             console.warn(img)
             this.setState({
                 deleteMode: img
             });
         }
     }

     _deleteMedia() {
         store.dispatch(deleteMedia(this.state.deleteMode));
         
        this.setState({
            deleteMode: null
        });
     }

    render() {
        return (
            <div className="container-fluid tagus-gallery">
                <div className="row">
                    {this.props.images.map((img, index) => {
                        return (
                            <div key={index} className="col-xs-12 col-sm-2 tagus-gallery-container">
                                <div className="tagus-gallery-image-container">
                                    <div className="tagus-gallery-image-control-bar">
                                        <a className="tagus-gallery-image-control-bar-icon" onClick={this._toggleModal(img.src)}><i className="fa fa-trash-o"></i></a>
                                        <ImgLink link={img.src} />
                                    </div>
                                    <span className="helper"></span>
                                    <img onClick={this.setImage(index)} className="tagus-gallery-image" src={img.src} alt={img.name} title={img.name} />
                                </div>
                            </div>
                        )
                    })}
                    <div className="col-xs-12 col-sm-2 tagus-gallery-container text-center">
                        <span className="helper"></span>
                        <InputFile uploadingMedia={this.props.uploadingMedia} />
                    </div>
                </div>
                <Modal type='warning' show={!!this.state.deleteMode} title="Warning!" body={"Are you sure you want to DELETE PERMANENTLY this media?"} closeButton={{onClick: this._toggleModal(), text: "Cancel"}} confirmButton={{onClick:this._deleteMedia.bind(this), text: "Yes, I'm sure!"}} />
                <Lightbox images={this.props.images} isOpen={this.state.isLightBoxOpen} currentImage={this.state.currentImage} onClickNext={this.gotoNextLightboxImage.bind(this)} onClickPrev={this.gotoPrevLightboxImage.bind(this)} onClose={this.toggleLightBox(false)} />
            </div>
        )
    }
}

Gallery.propTypes = {
    images: PropTypes.array.isRequired,
    uploadingMedia: PropTypes.bool.isRequired
};

export default Gallery;