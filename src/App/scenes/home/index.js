import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Panel from '../../components/Panel';
import './home.css';


class Home extends Component {
    render() {
        return (
            <section id="home" className="full-height col-xs-12">
                <Panel className="col-xs-12 full-height">
                    <div className="row">
                        <div className="col-xs-12 tagus-home-title-container">
                            <h2 className="tagus-home-title">Welcome Tagus CMS!</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 tagus-home-subtitle-container">
                            <h3 className="tagus-home-subtitle">Getting started:</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 tagus-home-intructions">
                            <p className="tagus-home-intruction">
                                Navigate to <span className="tagus-home-intruction-item">Units</span> to create a data structure to be associated with a <span className="tagus-home-intruction-item">Content</span> or a <span className="tagus-home-intruction-item">Bridge</span>. Select which templates can be associated with it!
                            </p>
                        </div>
                    </div>
                    <div className="container-fluid tagus-home-instructions">
                        <div className="row">
                            <p className="col-xs-12 tagus-home-intruction">
                                In <span className="tagus-home-intruction-item">Content</span> you can edit the content of the pages of your website. Note that this only applies to the content of every single page.
                            </p>
                        </div>
                        <div className="row">
                            <p className="col-xs-12 tagus-home-intruction">
                                The <span className="tagus-home-intruction-item">Bridges</span> are a usefull type of content that need to be available in all your website, and not only to a single page.
                            </p>
                        </div>
                        <div className="row">
                            <p className="col-xs-12 tagus-home-intruction">
                                    <span className="tagus-home-intruction-item">Media</span> holds the images that are used in your website.
                            </p>
                        </div>
                        <div className="row">   
                            <p className="col-xs-12 tagus-home-intruction">
                                    <span className="tagus-home-intruction-item">Translates</span> are a neat type of content, that is also available in all your website! It does not need a <span className="tagus-home-intruction-item">Unit</span>. Think of this when you want to add a text to a 'button' type of content.
                            </p>
                        </div>
                        <div className="row">
                            <p className="col-xs-12 tagus-home-intruction">
                                    Manage the access to your Tagus CMS in <span className="tagus-home-intruction-item">Users</span>. There you can add new users, change their permissions level or even delete old users.
                            </p>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-xs-12 ">
                            <p className="tagus-home-thanking-note">
                                Thank you for using <span className="tagus-home-thanking-note-highlight">Tagus CMS</span>! 
                            </p>
                        </div>
                    </div>
                </Panel>
            </section>
        );
    }
}

export default Home;
