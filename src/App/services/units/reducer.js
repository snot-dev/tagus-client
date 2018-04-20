import { constants } from '../constants';
import {convertArrayToDictionary} from '../helpers';

export const unitsReducer = function(state, action) {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case constants.units.GET_UNITS_DETAIL_PENDING: {
            newState.fetchingDetail = true;
            return newState;
        }
        case constants.units.GET_UNITS_DETAIL_FULFILLED: {
            newState.fetchingList = false;
            if (action.payload.data.success) {
                newState.detail = action.payload.data.item;
            }
            return newState;
        }
        case constants.units.DELETE_UNIT_PENDING:
        case constants.units.GET_UNITS_LIST_PENDING: {
            newState.fetchingList = true;
            return newState;
        }
        case constants.units.GET_UNITS_LIST_FULFILLED: {
            newState.fetchingList = false;
            if(action.payload.data.success) {
                newState.list = action.payload.data.list;
                newState.dictionary = convertArrayToDictionary(action.payload.data.list);
            }
            return newState;
        }
        case constants.units.GET_UNITS_TEMPLATES_PENDING: {
            newState.fetchingTemplates = true;
            return newState;
        }
        case constants.units.GET_UNITS_TEMPLATES_FULFILLED: {
            newState.fetchingTemplates = false;
            if(action.payload.data.success) {
                newState.templates = action.payload.data.list;
            }
            return newState;
        }
        case constants.units.GET_UNITS_FIELDS_PENDING: {
            newState.fetchingUnitFields = true;
            return newState;
        }
        case constants.units.GET_UNITS_FIELDS_FULFILLED: {
            if(action.payload.data.list) {
                newState.unitFields = action.payload.data.list;
            }
            newState.fetchingUnitFields = false;
            return newState;
        }
        case constants.units.ADDING_TAB: {
            newState.addingTab = action.payload || !state.addingTab;
            return newState;
        }
        case constants.units.ADDING_FIELD: {
            newState.addingField = action.payload || false;
            return newState;
        }
        case constants.units.UPDATE_UNIT: {
            newState.detail = action.payload;
            return newState;
        }  
        case constants.units.POST_UNIT_DETAIL_PENDING: {
            newState.savingDetail = true;
            return newState;
        }
        case constants.units.POST_UNIT_DETAIL_FULFILLED: { 
            if (action.payload.data.success) {
                newState.detail = action.payload.data.result;
            }
            newState.savingDetail = false;
            return newState;
        }
        case constants.units.CREATE_UNIT_PENDING: {
            newState.savingDetail = true;
            return newState;
        }
        case constants.units.CREATE_UNIT_FULFILLED: {
            newState.savingDetail = false;
            return newState;
        }
        case constants.units.DELETE_UNIT_FULFILLED: {
            newState.fetchingList = false;
            if (action.payload.data.warning) {
                newState.content = action.payload.data.content;
            }

            return newState;
        }
        case constants.units.CLEAR_CONTENT: {
            newState.content = [];
            return newState;
        }
        default:
            return state || {};   
    }
};