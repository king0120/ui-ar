import {combineReducers} from 'redux';
import fuse from './fuse';
import finalFormReducer from "./finalFormReducer";
import searchReducer from "./searchReducer";
import roleReducer from "./roleReducer";

const createReducer = (_asyncReducers?: any) =>
    combineReducers({
        fuse,
        roles: roleReducer,
        fform: finalFormReducer,
        search: searchReducer
    });

export default createReducer;
