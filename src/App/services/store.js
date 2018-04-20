import { combineReducers, createStore, applyMiddleware } from "redux";
import { contentReducer } from './content/reducer';
import { unitsReducer } from './units/reducer';
import { bridgesReducer } from './bridges/reducer';
import { messagesReducer } from './messages/reducer';
import { translatesReducer } from './translates/reducer';
import { usersReducer } from './users/reducer';
import { authReducer } from './auth/reducer';
import { profileReducer} from './profile/reducer';
import { mediaReducer} from './media/reducer';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import {createLogger} from 'redux-logger';

const rootReducer = combineReducers({
    content: contentReducer,
    units: unitsReducer,
    bridges: bridgesReducer,
    messages: messagesReducer,
    translates: translatesReducer,
    users: usersReducer,
    auth: authReducer,
    profile: profileReducer,
    media: mediaReducer
});

const initialState = {
    content: {
        list: [],
        treeList: [],
        detail: {},
        units: {},
        fetchingList: false,
        fetchingDetail: false,
        savingDetail: false,
        savingContent: false,
        editingContent: null,
        createUnit: null
    },
    units: {
        list: [],
        dictionary: {},
        detail: {},
        fetchingList: false,
        fetchingDetail: false,
        fetchingTemplates: false,
        fetchingUnitFields: false,
        savingDetail: false,
        templates: [],
        addingTab: false,
        addingField: false,
        unitFields: [],
        content: []
    },
    bridges: {
        list: [],
        units: {},
        fetchingList: false,
        detail: {},
        fetchingDetail: false,
        savingDetail: false,
        createNew: null
    },
    messages: {
        list: []
    },
    translates: {
        list: {},
        fetchingList: false, 
        savingList: false
    },
    users: {
        list: [],
        dictionary: {},
        detail: {},
        fetchingList: false,
        fetchingDetail: false,
        savingDetail: false,
        creatingUser: false,
        deletingUser: false
    },
    auth: {
        loggingIn: false,
        loggedIn: false,
        fetchingLoggedUser: false,
        result: null,
        user: {},
        shouldInstall: true,
        checkingInfo: false,
        checkedInfo: false
    },
    profile: {
        user: {},
        savingUser: false
    },
    media: {
        list: [],
        fetchingList: false,
        uploadingMedia: false,
        deletingMedia: false
    }
};

export default applyMiddleware(promise(), thunk, createLogger())(createStore)(rootReducer, initialState);