import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigation from './components/Navigation';
import NavItem from './components/NavItem';
import './appBar.css';

class AppBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            window: {
                width: 0,
                height: 0
            },
            xs: false,
            collapsed: false
        };

        this._windowMinWidth = 768;

        this._updateWindowDimensions = this._updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this._updateWindowDimensions();
        window.addEventListener('resize', this._updateWindowDimensions);
    }
      
    componentWillUnmount() {
        window.removeEventListener('resize', this._updateWindowDimensions);
    }
    
    _updateWindowDimensions() {
        const min = window.innerWidth <= this._windowMinWidth;

        this.setState(
            {
                window: {
                    width: window.innerWidth,
                    height: window.innerHeight 
                },
                min,
                collapsed: min 
            }
        );
    }

    _shouldRender(route) {
        const isPrivate = !route.private || (route.private && this.props.user.isAdmin);

        return route.nav && isPrivate;
    }

    _onButtonClick() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    _onNavClick() {
        this.setState({
            collapsed: true
        });
    }

    render() {
        const collapsed = this.state.min && this.state.collapsed ? "collapsed" : '';
        return (
            <nav id="tagus-side-menu-container">
                {this.state.min
                ?   <div className="tagus-side-menu-button-container"><button onClick={this._onButtonClick.bind(this)} className={collapsed} id="tagus-side-menu-button"><i className="fa fa-bars"></i></button></div>
                :   null}
                <div className={collapsed} id="tagus-side-menu">
                    <Navigation title="Menu">
                        {this.props.routes.map((route, index) => {
                            if (!this._shouldRender(route)) {
                                return null;   
                            }

                            return (
                                <NavItem onClick={this._onNavClick.bind(this)} key={`${index}_${route.name}`} to={route.path} icon={route.icon}>{route.name}</NavItem>
                            );
                        })}
                    </Navigation>
                </div>
            </nav>
        );
    }
}

AppBar.prototypes = {
    routes: PropTypes.array,
    user: PropTypes.object
};

export default AppBar;