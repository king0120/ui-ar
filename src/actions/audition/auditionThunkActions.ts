import {Dispatch} from 'redux';
import arAxios from '../../axiosHelper';
import {AUDITION_ACTIONS} from './actions';

export function createAudition(projectId: string, audition: any) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});

        const res = await arAxios.post(`/api/v1/projects/${projectId}/auditions`, audition);

        dispatch({
            type: AUDITION_ACTIONS.FETCH_AUDITION_CREATE_SUCCESS,
            audition: res.data,
        });
    };
}

export function fetchAudition(projectId: string, id: string) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});

        const res = await arAxios.get(`/api/v1/projects/${projectId}/auditions/${id}`);

        dispatch({
            type: AUDITION_ACTIONS.FETCH_AUDITION_SUCCESS,
            audition: res.data,
        });
    };
}

export function fetchTimeSlots(projectId: number, auditionId: number) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});
        const res = await arAxios.get(`/api/v1/projects/${projectId}/audition/${auditionId}/audition-time-slot`);
        dispatch({
            type: AUDITION_ACTIONS.FETCH_AUDITION_TIMESLOTS_SUCCESS,
            timeSlots: res.data,
        });
    };
}

export function createTimeSlots(projectId: number, auditionId: number, timeSlots: any[]) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});
        const res = await arAxios.post(
            `/api/v1/projects/${projectId}/audition/${auditionId}/audition-time-slot`,
            timeSlots,
        );
        dispatch({
            type: AUDITION_ACTIONS.CREATE_AUDITION_TIMESLOT_SUCCESS,
            timeSlots: res.data,
        });
        dispatch<any>(fetchTimeSlots(projectId, auditionId));
    };
}

export function deleteTimeSlot(projectId: number, auditionId: number, timeSlotId: string) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});
        const res = await arAxios.delete(
            `/api/v1/projects/${projectId}/audition/${auditionId}/audition-time-slot/${timeSlotId}`,
        );
        dispatch({
            type: AUDITION_ACTIONS.FETCH_AUDITION_DELETE_SUCCESS,
            timeSlots: res.data,
        });
        dispatch<any>(fetchTimeSlots(projectId, auditionId));
    };
}

export function inviteToAudition(projectId: string, auditionId: number, user: any, timeSlotId: string) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});
        await arAxios.post(
            `/api/v1/projects/${projectId}/auditions/${auditionId}/talent`,
            {
                id: user,
                timeSlotId,
            },
        );
        dispatch({
            type: AUDITION_ACTIONS.ADD_TALENT_TO_AUDITION_SUCCESS,
        });
        dispatch<any>(fetchAudition(projectId, auditionId.toString()));
    };
}
