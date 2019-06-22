import {combineReducers} from 'redux';
import projectReducer from './projectReducer';
import organizationReducer from './organizationReducer';
import roleReducer from './roleReducer';
import {reducer as formReducer} from 'redux-form';
import auditionReducer from './auditionReducer';
import userReducer from './userReducer';
import finalFormReducer from './finalFormReducer';
import searchReducer from './searchReducer';

export default combineReducers<any>({
    projects: projectReducer,
    organization: organizationReducer,
    roles: roleReducer,
    form: formReducer,
    user: userReducer,
    auditions: auditionReducer,
    fform: finalFormReducer,
    search: searchReducer,
});
