import { constants } from '../constants';

export const mediaReducer = (state, action) => {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case constants.media.GET_MEDIA_PENDING: {
            newState.fetchingList = true;
            return newState;
        }
        case constants.media.GET_MEDIA_FULFILLED: {
            newState.fetchingList = false;
            if (action.payload.data.list) {
                newState.list = action.payload.data.list
            }

            return newState;
        }
        case constants.media.UPLOAD_MEDIA_PENDING: {
            newState.uploadingMedia = true;

            return newState;
        }
        case constants.media.UPLOAD_MEDIA_FULFILLED: {
            newState.uploadingMedia = false;

            return newState;
        }
        case constants.media.DELETE_MEDIA_PENDING: {
            newState.deletingMedia = true;

            return newState;
        }
        case constants.media.DELETE_MEDIA_FULFILLED: {
            newState.deletingMedia = false;

            return newState;
        }
        default: 
            return newState || {};
    }
}