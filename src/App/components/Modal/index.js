import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import {Modal} from 'react-bootstrap';
import './modal.css';

class CustomModal extends Component {
    render() {
        return(
            <Modal show={this.props.show}>
                <Modal.Header className={this.props.type} >
                    {this.props.title
                    ?   <Modal.Title>{this.props.title}</Modal.Title>
                    :   null}
                </Modal.Header>
                {this.props.body 
                ?   <Modal.Body>
                        {this.props.body}
                    </Modal.Body>
                :   null}
                <Modal.Footer>
                    {this.props.closeButton
                        ? <Button onClick={this.props.closeButton.onClick}>{this.props.closeButton.text}</Button>
                        :null
                    }
                    {this.props.confirmButton
                        ?<Button onClick={this.props.confirmButton.onClick} type="warning">{this.props.confirmButton.text}</Button>
                        :null
                    }
                </Modal.Footer>
            </Modal>
        );
    }
}

CustomModal.propTypes = {
    type: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string,
    closeButton: PropTypes.shape({
        onClick: PropTypes.func,
        text: PropTypes.string
    }),
    confirmButton: PropTypes.shape({
        onClick: PropTypes.func,
        text: PropTypes.string
    })
};

export default CustomModal;