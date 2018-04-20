import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './menu.css';
import Transition from 'react-transition-group/Transition';

class Menu extends Component {
    constructor(props) {
        super(props);

        this.transitionTimeout = 150;

        this.duration = {
            opacity: 150,
            width: 100
        };

        this.opacityTransitionStyles = {
            entering: { opacity: 0, display: 'block' },
            entered:  { opacity: 0.4, display: 'block' },
            exiting: { opacity: 0, display: 'block' },
            exited: { opacity: 0, display: 'none'}
        };
        
        this.opacityDefaultStyle = {
            transition: `opacity ${this.duration.opacity}ms ease-in-out`,
            display: 'none'
        };
        
        this.widthTransitionStyles = {
            entering: { width: 0, paddingLeft: 0, paddingRight: 0, display: 'block' },
            entered:  { width: null,  display: 'block' },
            exiting: {width: 0, paddingLeft: 0, paddingRight: 0, display:'block'},
            exited: {width: 0,  paddingLeft: 0, paddingRight: 0, display: 'none'}
        };

        this.widthDefaultStyle = {
            transition: `all ${this.duration.width}ms ease-in-out`,
            width: 0    
        };
    }

    _render(state) {
        return (
            <div className="row">
                <div className="col-xs-12">
                {this.props.title
                    ? <div className="row">
                            <div className="col-xs-12 tagus-menu-header">
                            {this.props.title}
                            {this.props.onCloseButton 
                            ? <div className="tagus-menu-close-button" onClick={this.props.onCloseButton}>X</div>
                            : null}
                            </div>
                        </div>
                    : null}
                    <div className="row">
                        <div className="col-xs-12 tagus-menu-content">
                            {this.props.children}   
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    render() {
        const className = this.props.className || '';
        return (
            <Transition in={this.props.show} timeout={this.transitionTimeout}>
                {(state) => (
                    <div className="tagus-menu-container">
                        <div style={{
                        ...this.opacityDefaultStyle,
                        ...this.opacityTransitionStyles[state]
                         }} className="tagus-menu-backdrop"></div>
                        <div className={`tagus-menu ${className}`} style={{
                            ...this.widthDefaultStyle, ...this.widthTransitionStyles[state]
                        }}>
                            {this.props.show ? this._render(state) : null}
                        </div>
                    </div>
                )}
            </Transition>
        );
    }
}

Menu.propTypes = {
    title: PropTypes.string.isRequired,
    onCloseButton: PropTypes.func,
    show: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
};

export default Menu;