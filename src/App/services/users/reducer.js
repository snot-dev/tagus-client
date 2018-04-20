import {constants} from '../constants';
import {convertArrayToDictionary} from '../helpers';

export const usersReducer = function(state, action) {
    const newState = Object.assign({}, state);

    switch(action.type) {
        case constants.users.GET_USERS_LIST_PENDING: {
            newState.fetchingList = true;
            return newState;
        }
        case constants.users.GET_USERS_LIST_FULFILLED: {
            newState.fetchingList = false;
            newState.list = action.payload.data.list;
            newState.dictionary = convertArrayToDictionary(newState.list);
            return newState;
        }
        case constants.users.GET_USER_DETAIL_PENDING: {
            newState.fetchingDetail = true;
            return newState;
        }
        case constants.users.GET_USER_DETAIL_FULFILLED: {
            newState.fetchingDetail = false;
            newState.detail = action.payload.data.item;
            return newState;
        }
        case constants.users.CREATE_USER_PENDING: {
            newState.creatingUser = true;
            return newState;
        }
        case constants.users.CREATE_USER_FULFILLED: {
            newState.creatingUser = false;

            return newState;
        }
        case constants.users.DELETING_USER_PENDING: {
            newState.deletingUser = true;
            return newState;
        }
        case constants.users.DELETE_USER_FULFILLED: {
            newState.deletingUser = false;
            return newState;
        }
        case constants.users.UPDATE_USER_PENDING: {
            newState.savingDetail = true;
            return newState;
        }
        case constants.users.UPDATE_USER_FULFILLED: {
            newState.savingDetail = false;
            if (action.payload.data.success) {
                newState.detail = action.payload.data.result;
            }

            return newState;
        }
        default: {
            return newState || {};
        }
    }
}