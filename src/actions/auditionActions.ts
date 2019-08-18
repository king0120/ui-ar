import {Dispatch} from 'redux';
import arAxios from '../utils/axiosHelper';
import {finishLoad, startLoad} from "./generalActions";

export enum AUDITION_ACTIONS {
    ADD_TALENT_TO_AUDITION_SUCCESS = 'ADD_TALENT_TO_AUDITION_SUCCESS',
    FETCH_AUDITION_SUCCESS = 'FETCH_AUDITION_SUCCESS',
    FETCH_AUDITION_CREATE_SUCCESS = 'FETCH_AUDITION_CREATE_SUCCESS',
    FETCH_AUDITION_EDIT_SUCCESS = 'FETCH_AUDITION_EDIT_SUCCESS',
    FETCH_AUDITION_DELETE_SUCCESS = 'FETCH_AUDITION_DELETE_SUCCESS',
    CREATE_AUDITION_TIMESLOT_SUCCESS = 'CREATE_AUDITION_TIMESLOT_SUCCESS',
    FETCH_AUDITION_TIMESLOTS_SUCCESS = 'FETCH_AUDITION_TIMESLOTS_SUCCESS'
}

export function fetchTimeSlots(projectId: number, auditionId: number) {
    return async (dispatch: Dispatch) => {
        dispatch(startLoad());
        const res = await arAxios.get(`/api/v1/projects/${projectId}/audition/${auditionId}/audition-time-slot`);
        dispatch({
            type: AUDITION_ACTIONS.FETCH_AUDITION_TIMESLOTS_SUCCESS,
            timeSlots: res.data,
        });
        dispatch(finishLoad());
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

export function removeActorFromTimeslot(projectId: number, auditionId: number, timeSlotId: string) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});
        await arAxios.put(
            `/api/v1/projects/${projectId}/audition/${auditionId}/audition-time-slot/${timeSlotId}/removeTalent`,
        );

        dispatch<any>(fetchTimeSlots(projectId, auditionId));
    };
}

export function inviteToAudition(projectId: string, auditionId: number, user: any, timeSlotId?: string) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});
        const body: any = {id: user}
        if (timeSlotId){
            body.timeSlotId = timeSlotId
        }
        await arAxios.post(
            `/api/v1/projects/${projectId}/auditions/${auditionId}/talent`,
            body
        );
        dispatch({
            type: AUDITION_ACTIONS.ADD_TALENT_TO_AUDITION_SUCCESS,
        });
    };
}

export function respondToAudition(projectId: string, auditionId: number, email: string, responseCode: string, response: string) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});
        await arAxios.put(
            `/api/v1/projects/${projectId}/auditions/${auditionId}/response`,
            {
                email,
                responseCode,
                response
            },
        );
        dispatch({
            type: AUDITION_ACTIONS.ADD_TALENT_TO_AUDITION_SUCCESS,
        });
    };
}

export function updateInstance(projectId: string, auditionId: number, instanceId: string, body: any) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});
        await arAxios.put(
            `/api/v1/projects/${projectId}/auditions/${auditionId}/instance/${instanceId}`,
            body,
        );
        dispatch({
            type: 'UPDATE_INSTANCE_SUCCESS',
        });
    };
}


