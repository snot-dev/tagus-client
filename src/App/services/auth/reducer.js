import { constants } from '../constants';
import {update} from '../axios';

export const authReducer = (state, action) => {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case constants.auth.LOGIN_PENDING: {
            newState.loggingIn = true;
            newState.result = null;
            return newState;
        }
        case constants.auth.LOGIN_FULFILLED: {
            newState.loggingIn = false;
            if (action.payload.data.error) {
                newState.result = action.payload.data;
            }
            else if (action.payload.data.success) {
                newState.loggedIn = true;
                newState.user = action.payload.data.user;
                localStorage.setItem('user', JSON.stringify(action.payload.data.token));
                update(action.payload.data.token);
            }

            return newState;
        }
        case constants.auth.LOGOFF: {
            newState.loggedIn = false;
            newState.user = {};
            localStorage.removeItem('user');
            update();
            return newState;
        }
        case constants.auth.GET_LOGGED_USER_PENDING: {
            newState.fetchingLoggedUser = true;
            return newState;
        }
        case constants.auth.GET_LOGGED_USER_FULFILLED: {
            newState.fetchingLoggedUser = false;
            if (action.payload.data.user) {
                newState.loggedIn = true;
                newState.user = action.payload.data.user;
            } 
            else {
                newState.loggedIn = false;
                newState.user = {};
                localStorage.removeItem('user');
            }

            return newState;
        }
        case constants.profile.UPDATE_PROFILE_FULFILLED: {
            newState.user = action.payload.data.result;
            return newState;
        }
        case constants.auth.GET_INFO_PENDING: {
            newState.checkingInfo = true;
            return newState;
        }
        case constants.auth.GET_INFO_FULFILLED: {
            newState.checkingInfo = false;
            newState.checkedInfo = true;
            newState.shouldInstall = action.payload.data;
            return newState;
        }
        case constants.auth.CREATE_ADMIN_PENDING: {
            newState.loggingIn = false;
            return newState;
        }
        case constants.auth.CREATE_ADMIN_FULFILLED: {
            newState.loggingIn = false;
            if (action.payload.data.error) {
                newState.result = action.payload.data;
            }
            else if (action.payload.data.success) {
                newState.loggedIn = true;
                newState.user = action.payload.data.user;
                newState.shouldInstall = false;
                localStorage.setItem('user', JSON.stringify(action.payload.data.token));
                update(action.payload.data.token);
            }

            return newState;
        }
        default: 
            return newState || {};
    }
}