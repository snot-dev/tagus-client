import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './appContainer.css';

class AppContainer extends Component {
    render() {
        return (
            <section id="tagus-container" className="container-fluid">
                <div className="container-fluid full-height">
                    <div className="row full-height">
                        {this.props.children}
                    </div>
                </div>
            </section>
        );
    }
}

AppContainer.propTypes = {
    children: PropTypes.array
}

export default AppContainer;
