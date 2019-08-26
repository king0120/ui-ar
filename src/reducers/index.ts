import {combineReducers} from 'redux';
import roleReducer from './roleReducer';
import userReducer from './userReducer';
import finalFormReducer from './finalFormReducer';
import searchReducer from './searchReducer';

export default combineReducers<any>({
    roles: roleReducer,
    user: userReducer,
    fform: finalFormReducer,
    search: searchReducer,
});
