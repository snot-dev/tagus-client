import { constants } from '../constants';

export const profileReducer = (state, action) => {
    const newState = Object.assign({}, state);

    switch(action.type) {
        case constants.auth.LOGIN_FULFILLED:
        case constants.auth.CREATE_ADMIN_FULFILLED: {
            if (action.payload.data.success) {
                newState.user = action.payload.data.user;
            }
            return newState;
        }
        case constants.auth.GET_LOGGED_USER_FULFILLED: {
            if (action.payload.data.user) {
                newState.user = action.payload.data.user;
            } 
            return newState;
        }
        case constants.profile.UPDATE_PROFILE_PENDING:
        case constants.profile.UPDATE_PASSWORD_PENDING: {
            newState.savingUser = true;
            return newState;
        }
        case constants.profile.UPDATE_PROFILE_FULFILLED: {
            newState.savingUser = false;
            newState.user = action.payload.data.result;
            return newState;
        }
        case constants.profile.UPDATE_PASSWORD_FULFILLED: {
            newState.savingUser = false;
            return newState;
        }
        default:
            return newState || {};
    }
}