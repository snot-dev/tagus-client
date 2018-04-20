import {constants} from '../constants';

export function deleteMessage(index) {  
    return (dispatch, getState) => {
        dispatch({
            type: constants.messages.DELETE_MESSAGE,
            payload: index
        });
    };
};