import {constants} from '../constants';
import axios from '../axios';

const _shouldGetTranslatesList = state => {
    return Object.keys(state.translates.list).length === 0;
};

export function getListIfNedeed() {  
    return (dispatch, getState) => {
        if(_shouldGetTranslatesList(getState())) {
            dispatch({
                type: constants.translates.GET_TRANSLATES_LIST,
                payload: axios.get('/translates')
            });
        }
    };
};

export function saveTranslates(translates) {
    return (dispatch, getState) => {
        const update = {
            translates,
            lastEditedBy: getState().auth.user.email
        };
        dispatch({
            type: constants.translates.POST_TRANSLATES_LIST,
            payload: axios.post('/translates', update)
        });
    }
}