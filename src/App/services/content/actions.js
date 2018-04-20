import _ from 'lodash';
import {constants} from '../constants';
import {createFakeItemResponse} from '../helpers';
import axios from '../axios';

const _shouldGetPageList = state => {
    return state.content.list;
};

const _shouldGetContentDetail = (state, id) => {
    return !state.content.detail._id || state.content.detail._id !== id;
};

const _shouldGetUnitsList = state => {
    return state.content.units;
};

export function getUnitsListIfNeeded(){
    return (dispatch, getState) => {
        if(_shouldGetUnitsList(getState())) {
            dispatch({
                type: constants.content.GET_CONTENT_UNITS_LIST,
                payload: axios('units')
            })
        }
    };
};

export function getContentListIfNeeded(){
    return (dispatch, getState) => {
        if( _shouldGetPageList(getState())) {
            dispatch( {
                type: constants.content.GET_CONTENT_LIST,
                payload: axios('content')
            })
        }
    };
};

export function getContentDetailIfNeeded(id) {
    return (dispatch, getState) => {
        const state = getState();

        if(_shouldGetContentDetail(state, id)) {
            if(state.content.list[id]) {
                dispatch({
                    type: constants.content.GET_CONTENT_DETAIL_FULFILLED,
                    payload: createFakeItemResponse(state.content.list[id])
                });
            } else {
                dispatch({
                    type: constants.content.GET_CONTENT_DETAIL,
                    payload: axios(`content/${id}`)
                });
            }
        }
    };
};

export function updateContentField(data) {
    return (dispatch, getState) => {
        dispatch({
            type: constants.content.GET_UPDATED_CONTENT_FIELD,
            payload: data
        });
    }
};

export function saveContent(content) {
    return (dispatch, getState) => {
        const updatedContent = _.cloneDeep(content);
        updatedContent.lastEditedBy = getState().auth.user.email;
        dispatch({
            type:constants.content.POST_CONTENT_DETAIL,
            payload: axios.put(`content/${updatedContent._id}`, updatedContent)
            
        })
        .then(()  => {
            dispatch( {
                type: constants.content.GET_CONTENT_LIST,
                payload: axios('content')
            });
        });
    };
};

export function editContent(content) {
    return (dispatch, getState) => {
        dispatch({
            type: constants.content.EDITIING_CONTENT,
            payload: content
        });
    };
};

export function createUnit(unit) {
    return (dispatch, getState) => {
        dispatch({
            type: constants.content.CREATE_UNIT,
            payload: unit
        });
    };
};

export function createContent(content) {
    return (dispatch, getState) => {
        const newContent = _.cloneDeep(content);
        newContent.createdBy = getState().auth.user.email;

        dispatch({
            type: constants.content.CREATE_CONTENT,
            payload: axios.post('content', newContent)
        })
        .then(()  => {
            dispatch( {
                type: constants.content.GET_CONTENT_LIST,
                payload: axios('content')
            });
        });
    }
};

export function deleteContent(id) {
    return (dispatch, getState) => {
        dispatch({
            type: constants.content.DELETE_CONTENT,
            payload: axios.delete(`content/${id}`)
        })
        .then(()  => {
            dispatch( {
                type: constants.content.GET_CONTENT_LIST,
                payload: axios('content')
            });
        });
    }
};

