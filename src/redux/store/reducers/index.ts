import { combineReducers } from "redux";
import finalFormReducer from "./finalFormReducer";
import searchReducer from "./searchReducer";

const createReducer = (_asyncReducers?: any) =>
  combineReducers({
    fform: finalFormReducer,
    search: searchReducer
  });

export default createReducer;
