import {combineReducers} from 'redux';
import fuse from './fuse';
import finalFormReducer from "./finalFormReducer";
import searchReducer from "./searchReducer";
import roleReducer from "./roleReducer";
import eventsReducer from '../../../app/pages/Audition/partials/AuditionManagerCalendar/calendar/store/reducers';

const createReducer = (_asyncReducers?: any) =>
    combineReducers({
        fuse,
        roles: roleReducer,
        fform: finalFormReducer,
        search: searchReducer,
        calendarApp: eventsReducer
    });

export default createReducer;
