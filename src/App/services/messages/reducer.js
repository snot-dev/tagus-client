import { constants } from '../constants';

export const messagesReducer = (state, action) => {
    const newState = Object.assign({}, state);

    switch(action.type) {
        case constants.messages.DELETE_MESSAGE: {
            if (action.payload || action.payload === 0) {
                newState.list.splice(action.payload, 1);
            } 
            else {
                newState.list.shift();
            }
            
            return newState;
        }
        case constants.content.GET_CONTENT_LIST_FULFILLED:
        case constants.content.GET_CONTENT_UNITS_LIST_FULFILLED:
        case constants.content.GET_CONTENT_UNITS_LIST_REJECTED:
        case constants.content.GET_CONTENT_DETAIL_REJECTED:
        case constants.content.GET_CONTENT_DETAIL_UNITTYPE_REJECTED:
        case constants.content.POST_CONTENT_DETAIL_REJECTED:
        case constants.content.CREATE_CONTENT_REJECTED:
        case constants.content.DELETE_CONTENT_REJECTED:
        case constants.bridges.GET_BRIDGES_LIST_FULFILLED:
        case constants.bridges.GET_BRIDGES_UNITS_LIST_FULFILLED:
        case constants.bridges.GET_BRIDGES_LIST_REJECTED:
        case constants.bridges.GET_BRIDGES_UNITS_LIST_REJECTED:
        case constants.bridges.GET_BRIDGES_DETAIL_REJECTED:
        case constants.bridges.POST_BRIDGES_DETAIL_REJECTED:
        case constants.bridges.CREATE_BRIDGE_REJECTED:
        case constants.units.GET_UNITS_LIST_FULFILLED:
        case constants.units.GET_UNITS_LIST_REJECTED:
        case constants.units.GET_UNITS_DETAIL_REJECTED:
        case constants.units.GET_UNITS_TEMPLATES_REJECTED:
        case constants.units.GET_UNITS_FIELDS_REJECTED:
        case constants.units.POST_UNIT_DETAIL_REJECTED:
        case constants.units.CREATE_UNIT_REJECTED: 
        case constants.units.DELETE_UNIT_REJECTED:
        case constants.users.CREATE_USER_REJECTED:
        case constants.users.DELETE_USER_REJECTED: {
            if (!action.payload.data.success) {
                newState.list.push({
                    type: 'error',
                    message: action.payload.data.message
                });
            }

            return newState;
        }
        case constants.content.POST_CONTENT_DETAIL_FULFILLED:
        case constants.units.POST_UNIT_DETAIL_FULFILLED: 
        case constants.bridges.POST_BRIDGES_DETAIL_FULFILLED:
        case constants.translates.POST_TRANSLATES_LIST_FULFILLED:
        case constants.profile.UPDATE_PROFILE_FULFILLED:
        case constants.content.CREATE_CONTENT_FULFILLED:
        case constants.bridges.CREATE_BRIDGE_FULFILLED:
        case constants.units.CREATE_UNIT_FULFILLED:
        case constants.media.UPLOAD_MEDIA_FULFILLED:
        case constants.content.DELETE_CONTENT_FULFILLED:
        case constants.bridges.DELETE_BRIDGE_FULFILLED:
        case constants.media.DELETE_MEDIA_FULFILLED:
        case constants.profile.UPDATE_PASSWORD_FULFILLED: 
        case constants.units.DELETE_UNIT_FULFILLED:
        case constants.users.CREATE_USER_FULFILLED:
        case constants.users.DELETE_USER_FULFILLED:
        case constants.users.UPDATE_USER_FULFILLED: {
            let type = 'success';

            if (action.payload.data.error) {
                type = 'error';
            } 
            else if (action.payload.data.warning) {
                type = 'warning';
            }
            
            if (action.payload.data.message) {
                newState.list.push({
                    type,
                    message: action.payload.data.message
                });
            }

            return newState;
        }
        default: {
            return state || {};
        }
    }
}