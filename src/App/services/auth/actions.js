import {constants} from '../constants';
import axios from '../axios';

const _shouldFetchUser = state => {
    return localStorage.getItem('user') && !state.auth.user._id && !state.auth.loggedIn;
}

export function login(user) {
    return (dispatch, getState) => {
        dispatch({
            type: constants.auth.LOGIN,
            payload: axios.post('auth', user)
        });
    }
}

export function logoff() {
    return(dispatch, getState) => {
        dispatch({
            type: constants.auth.LOGOFF
        });
    }
}

export function getLoggedUser() {
    return (dispatch, getState) => {
        const state = getState();

        if (_shouldFetchUser(state)) {
            dispatch({
                type: constants.auth.GET_LOGGED_USER,
                payload: axios.get('auth')
            });
        }
    }
}

export function checkIfInstall() {
    return (dispatch, getState) => {
        dispatch ({
            type: constants.auth.GET_INFO,
            payload: axios.get('auth/info')
        }); 
    }
}

export function createAdmin(user) {
    return (dispatch, getState) => {
        user.isCreator = true;
        dispatch ({
            type: constants.auth.CREATE_ADMIN,
            payload: axios.post('auth/create', user)
        });
    };
}