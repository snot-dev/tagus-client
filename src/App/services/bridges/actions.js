import _ from 'lodash';
import {constants} from '../constants';
import {createFakeItemResponse} from '../helpers';
import axios from '../axios';

const _shouldFetchBridgesList = state => {
    return state.bridges.list.length === 0;
}

const _shouldGetBridgeDetail = (state, id) => {
    return !state.bridges.detail._id || state.bridges.detail._id !== id;
};

const _shouldGetUnitsList = state => {
    return state.bridges.units;
};

export function getBridgesListIfNeeded() {
    return (dispatch, getState) => {
        if(_shouldFetchBridgesList(getState())) {
            dispatch({
                type: constants.bridges.GET_BRIDGES_LIST,
                payload: axios('bridges')
            })
        }
    }
};

export function getUnitsListIfNeeded(){
    return (dispatch, getState) => {
        if(_shouldGetUnitsList(getState())) {
            dispatch({
                type: constants.bridges.GET_BRIDGES_UNITS_LIST,
                payload: axios('units')
            })
        }
    };
};

export function getBridgeDetailIfNeeded(id) {
    return (dispatch, getState) => {
        const state = getState();

        if(_shouldGetBridgeDetail(state, id)) {
            if(state.bridges.list[id]) {
                dispatch({
                    type: constants.bridges.GET_BRIDGES_DETAIL_FULFILLED,
                    payload: createFakeItemResponse(state.bridges.list[id])
                });
            } else {
                dispatch({
                    type: constants.bridges.GET_BRIDGES_DETAIL,
                    payload: axios(`bridges/${id}`)
                });
            }
        }
    };
};

export function saveBridge(bridge) {
    return (dispatch, getState) => {
        const updatedBridge = _.cloneDeep(bridge);
        updatedBridge.lastEditedBy = getState().auth.user.email;

        dispatch({
            type:constants.bridges.POST_BRIDGES_DETAIL,
            payload: axios.put(`bridges/${updatedBridge._id}`, updatedBridge)
            
        })
        .then(()  => {
            dispatch( {
                type: constants.bridges.GET_BRIDGES_LIST,
                payload: axios('bridges')
            });
        });
    };
};

export function createBridge(bridge) {
    return (dispatch, getState) => {
        const newBridge = _.cloneDeep(bridge);
        newBridge.createdBy = getState().auth.user.email;
        
        dispatch({
            type:constants.bridges.CREATE_BRIDGE,
            payload: axios.post(`bridges`, newBridge)
        })
        .then(()  => {
            dispatch( {
                type: constants.bridges.GET_BRIDGES_LIST,
                payload: axios('bridges')
            });
        });
    }
}

export function deleteBridge(id) {
    return (dispatch, getState) => {
        dispatch({
            type:constants.bridges.DELETE_BRIDGE,
            payload: axios.delete(`bridges/${id}`)
        })
        .then(() => {
            dispatch( {
                type: constants.bridges.GET_BRIDGES_LIST,
                payload: axios('bridges')
            });
        });
    };
}
