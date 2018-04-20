import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import AppBar from './components/AppBar';
import TopBar from './components/TopBar';
import AppContainer from './components/AppContainer';
import Messages from './components/Messages';
import Content from './scenes/content';
import Units from './scenes/units';
import Bridges from './scenes/bridges';
import Translates from './scenes/translates';
import Users from './scenes/users';
import Profile from './scenes/profile';
import Media from './scenes/media';
import Home from './scenes/home';
import Overlay from './components/Overlay';
import store from './services/store';
import {logoff, getLoggedUser} from './services/auth/actions';
import  './app.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.routes = [
      {
        name: "Content",
        path: this._generatePath(props, '/content'),
        component: Content,
        icon: 'file',
        nav: true
      },
      {
        name: "Units",
        path: this._generatePath(props, '/units'),
        component: Units,
        icon: 'anchor',
        nav: true
      },
      {
        name: "Bridges",
        path: this._generatePath(props, '/bridges'),
        component: Bridges,
        icon: 'chevron-circle-up',
        nav: true
      },
      {
        name: "Media",
        path: this._generatePath(props, '/media'),
        component: Media,
        icon: 'image',
        nav: true
      },
      {
        name: "Translates",
        path: this._generatePath(props, '/translates'),
        component: Translates,
        icon: 'list',
        nav: true
      },
      {
        name: "Users",
        path: this._generatePath(props, '/users'),
        component: Users,
        icon: 'users',
        nav: true,
        private: true
      },
      {
        name: "Profile",
        path: this._generatePath(props, '/profile'),
        component: Profile
      }
    ];
  }

  _generatePath(props, path) {
    return `${props.match.url}${path}`;
  }

  componentDidMount() {
    if (localStorage.getItem('user')) {
      store.dispatch(getLoggedUser());
    }
  }

  _logoff() {
    store.dispatch(logoff());
    this.props.history.push('/login');
  }

  render() {
    return (  
      <div id ="tagus-app" className="App container-fluid">
        <Messages />
        <TopBar onLogoffClick={this._logoff.bind(this)} user={this.props.auth.user} />
        <AppBar user={this.props.auth.user} routes={this.routes} />
        <AppContainer>
          <Route exact path={'/home'} render={(props) => (<Home />)} />
          {this.routes.map((route, index) => {
            return(
              <Route key={`${index}_${route.name}`} path={route.path} render={(props) => (<route.component name={route.name} loggedUser={this.props.auth.user} {...props}/>) } />
            );
          })}
        </AppContainer>
        <Overlay show={this.props.auth.fetchingLoggedUser} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(App);
