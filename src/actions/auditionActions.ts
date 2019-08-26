import {Dispatch} from 'redux';
import arAxios from '../utils/axiosHelper';

export enum AUDITION_ACTIONS {
    ADD_TALENT_TO_AUDITION_SUCCESS = 'ADD_TALENT_TO_AUDITION_SUCCESS',
    FETCH_AUDITION_DELETE_SUCCESS = 'FETCH_AUDITION_DELETE_SUCCESS',
    CREATE_AUDITION_TIMESLOT_SUCCESS = 'CREATE_AUDITION_TIMESLOT_SUCCESS',
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


