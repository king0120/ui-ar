import {combineReducers} from 'redux';
import projectReducer from './projectReducer';
import organizationReducer from './organizationReducer';
import roleReducer from './roleReducer';
import {reducer as formReducer} from 'redux-form';
import auditionReducer from './auditionReducer';
import userReducer from './userReducer';
import finalFormReducer from './finalFormReducer';
import searchReducer from './searchReducer';
import globalReducer from "./globalReducer";

export default combineReducers<any>({
    projects: projectReducer,
    organization: organizationReducer,
    roles: roleReducer,
    global: globalReducer,
    form: formReducer,
    user: userReducer,
    auditions: auditionReducer,
    fform: finalFormReducer,
    search: searchReducer,
});
