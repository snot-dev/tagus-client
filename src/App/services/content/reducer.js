import { constants } from '../constants';
import {buildContentTree, convertArrayToDictionary} from '../helpers';

export const contentReducer = (state, action) => {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case constants.content.GET_CONTENT_LIST_PENDING: {
            newState.fetchingList = true;
            return newState;
        }
        case constants.content.GET_CONTENT_LIST_FULFILLED: {
            newState.fetchingList = false;
            if(action.payload.data.success) {
                newState.list = convertArrayToDictionary(action.payload.data.list);
                newState.treeList = buildContentTree(action.payload.data.list);
            }
            return newState;
        }
        case constants.content.GET_CONTENT_UNITS_LIST_PENDING: {
            newState.fetchingList = true;
            return newState;
        }
        case constants.content.GET_CONTENT_UNITS_LIST_FULFILLED: {
            newState.fetchingList = false;
            if (action.payload.data.list) {
                newState.units = convertArrayToDictionary(action.payload.data.list);
            }
            return newState;
        }
        case constants.content.GET_CONTENT_DETAIL_PENDING: {
            newState.fetchingDetail = true;
            return newState;
        }    
        case constants.content.GET_CONTENT_DETAIL_FULFILLED: {
            newState.fetchingDetail = false;
            if (action.payload.data.success) {
                newState.detail = action.payload.data.item;
            }
            newState.editingContent = null;
            return newState;
        }    
        case constants.content.GET_CONTENT_DETAIL_UNITTYPE_PENDING: {
            newState.fetchingDetail = true;
            return newState;
        }    
        case constants.content.GET_CONTENT_DETAIL_UNITTYPE_FULFILLED: {
            newState.fetchingDetail = false;
            // newState.unit = action.payload.data;
            return newState;
        } 
        case constants.content.GET_UPDATED_CONTENT_FIELD: {
            newState.detail.content[action.payload.name] = action.payload.value;
            return newState;
        }
        case constants.content.POST_CONTENT_DETAIL_PENDING: {
            newState.savingContent = true;
            return newState;
        }
        case constants.content.POST_CONTENT_DETAIL_FULFILLED: {
            if (action.payload.data.success) {
                newState.detail = action.payload.data.result;
                newState.editingContent = null;
            } 

            newState.savingContent = false;
            return newState;
        }
        case constants.content.EDITIING_CONTENT: {
            newState.editingContent = action.payload;
            return newState;
        }
        case constants.content.CREATE_UNIT: {
            newState.createUnit = action.payload;
            return newState;
        }
        case constants.content.CREATE_CONTENT_PENDING: {
            newState.savingContent = true;
            return newState;
        }
        case constants.content.CREATE_CONTENT_FULFILLED: {
            newState.savingContent = false;
            if (action.payload.data.success) {
                newState.editingContent = null;
                newState.createUnit = null;
                newState.detail = {};
                newState.createdContent = true;
            }
            return newState;
        }
        case constants.content.DELETE_CONTENT_PENDING: {
            newState.savingContent = true;
            newState.editingContent = null;
            newState.detail = {};
            return newState;
        }
        case constants.content.DELETE_CONTENT_FULFILLED: {
            newState.savingContent = false;
            return newState;
        }
        case constants.content.TURN_CREATED_TO_DETAIL: {
            newState.createdContent = false;
            return newState;
        }
        default:
            return state || {};
    }
};