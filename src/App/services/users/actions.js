import _ from 'lodash';
import axios from '../axios';
import {createFakeItemResponse} from '../helpers';
import {constants} from '../constants';


const _shouldGetUserDetail = (state, id) => {
    return !state.users.detail._id || state.users.detail._id !== id;
}

export function getUsersIfNeeded() {
    return (dispatch, getState) => {
        if (getState().users.list.length === 0) {
            dispatch({
                type: constants.users.GET_USERS_LIST,
                payload: axios.get('users')
            });
        }
    };
}

export function getUserDetailIfNeeded(id) {
    return (dispatch, getState) => {
        const state = getState();
        
        if (_shouldGetUserDetail(state, id)) {
            if (state.users.dictionary[id]) {
                dispatch({
                    type: constants.users.GET_USER_DETAIL_FULFILLED,
                    payload: createFakeItemResponse(state.users.dictionary[id]) 
                });
            }
            else {
                dispatch({
                    type: constants.users.GET_USER_DETAIL,
                    payload: axios.get(`users/${id}`)
                });
            }
        }
    };
}

export function createUser(user) {
    return (dispatch, getState) => {
        const newUser = _.clone(user);
        const requirer = getState().auth.user;
        newUser.createdBy = requirer.email;

        dispatch({
            type: constants.users.CREATE_USER,
            payload: axios.post('users', {requirer, user:newUser})
        })
        .then( ()=> {
            dispatch({
                type: constants.users.GET_USERS_LIST,
                payload: axios.get('users')
            });
        });
    };
}

export function deleteUser(id) {
    return (dispatch, getState) => {
        dispatch({
            type: constants.users.DELETE_USER,
            payload: axios.delete(`users/${id}`)
        })
        .then(()=> {
            dispatch({
                type: constants.users.GET_USERS_LIST,
                payload: axios.get('users')
            });
        });
    }
}

export function updateUser(user) {
    return (dispatch, getState) => {
        dispatch({
            type: constants.users.UPDATE_USER,
            payload: axios.put(`users/${user._id}`, user)
        });
    }
}