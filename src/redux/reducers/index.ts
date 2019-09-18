import {combineReducers} from 'redux';
import roleReducer from './roleReducer';
import finalFormReducer from './finalFormReducer';
import searchReducer from './searchReducer';

export default combineReducers<any>({
    roles: roleReducer,
    fform: finalFormReducer,
    search: searchReducer,
});
