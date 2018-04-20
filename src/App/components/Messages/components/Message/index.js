import React, { Component } from 'react';
import PropTypes from 'prop-types';
import store from '../../../../services/store';
import {deleteMessage} from '../../../../services/messages/actions';
import './message.css';

class Message extends Component {
    constructor(props) {
        super(props);

        this.timeout = 3500;
    }
    
    _deleteMessage() {
        store.dispatch(deleteMessage());
    }
    
    _onClick() {
        store.dispatch(deleteMessage(this.props.index));
    }

    componentDidMount() {
        setTimeout(()=> {
            this._deleteMessage();
        }, this.timeout);
    }

    render() {
        const text = `${this.props.message}`;
        return ( 
            <div className={`tagus-message ${this.props.type}`}>
                <a onClick={this._onClick.bind(this)} className="tagus-message-close-button">x</a>
                <p className="tagus-message-text">{text}</p>
            </div>
        );
    }
}

Message.propTypes = {
    index: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    result: PropTypes.string
};

export default Message;