import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Message from './components/Message';
import './messages.css';

class Messages extends Component {
    _renderMessages() {
        const messages = [];

        for(let i = 0; i < this.props.messages.list.length; i++) {
            const {type, message} = this.props.messages.list[i];

            messages.unshift(
                <CSSTransition key={`${i}_${type}`} timeout={500} classNames="fade">
                    <Message index={i} type={type} message={message} />
                </CSSTransition>
            );
        }

        return messages;
    }

    render() {
        return (
            <div className="tagus-messages-container">
                <TransitionGroup className="tagus-message-list">
                    {this._renderMessages()}
                </TransitionGroup>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      messages: state.messages
    };
};

Messages.propTypes = {
    messages: PropTypes.object.isRequired,
    show: PropTypes.bool
}

export default connect(mapStateToProps)(Messages);