import {Dispatch} from 'redux';
import arAxios from '../../utils/axiosHelper';

export enum AUDITION_ACTIONS {
    ADD_TALENT_TO_AUDITION_SUCCESS = 'ADD_TALENT_TO_AUDITION_SUCCESS',
    FETCH_AUDITION_DELETE_SUCCESS = 'FETCH_AUDITION_DELETE_SUCCESS',
    CREATE_AUDITION_TIMESLOT_SUCCESS = 'CREATE_AUDITION_TIMESLOT_SUCCESS',
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
