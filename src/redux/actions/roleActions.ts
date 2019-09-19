import {Dispatch} from 'redux';
import arAxios from '../../utils/axiosHelper';
import {IRole} from '../../types/IRole';

export enum ROLE_ACTIONS {
    FETCH_ROLES_SUCCESS = 'FETCH_ROLES_SUCCESS',
    FETCH_ROLE_CREATE_SUCCESS = 'FETCH_ROLE_CREATE_SUCCESS',
    FETCH_ROLE_EDIT_SUCCESS = 'FETCH_ROLE_EDIT_SUCCESS',
    FETCH_ROLE_DELETE_SUCCESS = 'FETCH_ROLE_DELETE_SUCCESS',
}

export function createProjectRole(projectId: number, newProjectRole: IRole) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});

        const res: { data: any } = await arAxios.post(`/api/v1/projects/${projectId}/roles`, newProjectRole);
        const role = res.data;
        dispatch({
            type: ROLE_ACTIONS.FETCH_ROLE_CREATE_SUCCESS,
            role,
        });
    };
}

export function castRole(projectId: string, id: string, userId: string) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});

        await arAxios.put(`/api/v1/projects/${projectId}/roles/${id}/cast`, {userId});
        dispatch({
            type: 'CAST_ROLE_SUCCESS',
        });
    };
}

export function deleteRole(projectId: number, roleId: number) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});

        const res: { data: any } = await arAxios.delete(`/api/v1/projects/${projectId}/roles/${roleId}`);
        const role = res.data;
        dispatch({
            type: ROLE_ACTIONS.FETCH_ROLE_DELETE_SUCCESS,
            role,
        });
    };
}

export function uploadDocument(projectId: string, id: string, file: File[]) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});
        const formData = new FormData();
        formData.append('upload', file[0]);
        await arAxios.put(`/api/v1/projects/${projectId}/roles/${id}/document`, formData);
        dispatch({
            type: 'UPLOAD_DOCUMENT',
        });
    };
}
