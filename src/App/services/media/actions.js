import {constants} from '../constants';
import axios from '../axios';

export function getMedia(){
    return (dispatch, getState) => {
        if(getState().media.list.length === 0) {
            dispatch({
                type: constants.media.GET_MEDIA,
                payload: axios('media')
            });
        }
    };
};

export function uploadMedia(file, name) {
    return (dispatch, getState) => {
        const data = new FormData();
        data.append('media', file);

        dispatch({
            type: constants.media.UPLOAD_MEDIA,
            payload: axios.post('media', data)
        })
        .then(() => {
            dispatch({
                type: constants.media.GET_MEDIA,
                payload: axios('media')
            });
        });
    };
}

export function deleteMedia(file) {
    return (dispatch, getState) => {
        dispatch({
            type: constants.media.DELETE_MEDIA,
            payload: axios.put('media', {file})
        })
        .then(() => {
            dispatch({
                type: constants.media.GET_MEDIA,
                payload: axios('media')
            });
        });
    }
}