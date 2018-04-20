import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import {PrivateRoute} from './App/components/PrivateRoute';
import './vendor/bootstrap/css/bootstrap.min.css';
import './vendor/bootstrap/css/bootstrap-theme.min.css';
import './vendor/font-awesome/css/font-awesome.min.css';
import App from './App';
import SigninPage from './App/scenes/signin';
import registerServiceWorker from './registerServiceWorker';
import store from './App/services/store';

ReactDOM.render(
    <Provider store={store}>
        <HashRouter >
            <Switch>
                <PrivateRoute path="/home" component={App} />
                <Route path="/signin" component={SigninPage} />
                <Redirect to="/home" />
            </Switch>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
    );
    
registerServiceWorker();
