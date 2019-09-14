import arAxios from '../utils/axiosHelper';
import {Dispatch} from 'redux';
import {IProject} from '../types/IProject';

export enum PROJECT_ACTIONS {
    FETCH_PROJECT_SUCCESS,
    FETCH_PROJECT_CREATE_SUCCESS,
    FETCH_PROJECT_EDIT_SUCCESS,
    FETCH_PROJECT_DELETE_SUCCESS,
}

//TODO: Implement
export function createProject(newProject: any, organizationId: number) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});

        const res: { data: IProject } = await arAxios.post(`/api/v1/projects`, {...newProject, organizationId});
        dispatch({
            type: PROJECT_ACTIONS.FETCH_PROJECT_CREATE_SUCCESS,
            project: res.data,
        });
    };
}

//TODO: Implement
export function editProject(id: number, body: IProject) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});

        const res: { data: IProject } = await arAxios.put(`/api/v1/projects/${id}`, body);
        dispatch({
            type: PROJECT_ACTIONS.FETCH_PROJECT_EDIT_SUCCESS,
            project: res.data,
        });
    };
}

//TODO: Implement
export function deleteProject(projectId: number) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});

        await arAxios.delete(`/api/v1/projects/${projectId}`);
        dispatch({
            type: 'DELETE_PROJECT',
            id: projectId,
        });
    };
}
