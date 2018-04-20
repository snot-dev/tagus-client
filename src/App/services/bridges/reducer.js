import { constants } from '../constants';
import {convertArrayToDictionary} from '../helpers';

export const bridgesReducer = (state, action) => {
    const newState = Object.assign({}, state);

    switch(action.type) {
        case constants.bridges.GET_BRIDGES_LIST_PENDING: {
            newState.fetchingList = true;
            return newState;
        }
        case constants.bridges.GET_BRIDGES_LIST_FULFILLED: {
            newState.fetchingList = false;
            if (action.payload.data.success) {
                newState.list = action.payload.data.list;
            }
            return newState;
        }
        case constants.bridges.GET_BRIDGES_UNITS_LIST_PENDING: {
            newState.fetchingList = true;
            return newState;
        }
        case constants.bridges.GET_BRIDGES_UNITS_LIST_FULFILLED: {
            newState.fetchingList = false;
            if (action.payload.data.success) {
                newState.units = convertArrayToDictionary(action.payload.data.list);
            }
            return newState;
        }
        case constants.bridges.GET_BRIDGES_DETAIL_PENDING: {
            newState.fetchingDetail = true;
            return newState;
        }
        case constants.bridges.GET_BRIDGES_DETAIL_FULFILLED: {
            if (action.payload.data.item) {
                newState.detail = action.payload.data.item;
            }
            newState.fetchingDetail = false;
            return newState;
        }
        case constants.bridges.POST_BRIDGES_DETAIL_PENDING: {
            newState.savingDetail = true;
            return newState;
        }
        case constants.bridges.POST_BRIDGES_DETAIL_FULFILLED: {
            if (action.payload.data.success) {
                newState.detail = action.payload.data.result;
            }
            newState.savingDetail = false;
            return newState;
        }
        case constants.bridges.CREATE_BRIDGE_PENDING: {
            newState.savingDetail = true;
            return newState;
        }
        case constants.bridges.CREATE_BRIDGE_FULFILLED: {
            newState.savingDetail = false;
            return newState;
        }
        default:
            return state || {}; 
    }
}