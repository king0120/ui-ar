import {Reducer} from "redux";
import {AUDITION_ACTIONS} from "../actions/audition/actions";

const initialState = {
    audition: {}
};

export interface ProjectState {
    audition: any;
}

const auditionReducer: Reducer<ProjectState> = (state = initialState, action: any) => {
    switch (action.type) {
        case AUDITION_ACTIONS.FETCH_AUDITION_SUCCESS:
            return {
                audition: action.audition
            };
        case AUDITION_ACTIONS.FETCH_AUDITION_TIMESLOTS_SUCCESS:
            const newAudition = {...state.audition}
            newAudition.timeSlots = action.timeSlots
            return {
                ...state,
                audition: newAudition
            }
        default:
            return state;
    }
};

export default auditionReducer;
