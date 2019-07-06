import {Dispatch} from 'redux';
import arAxios from '../utils/axiosHelper';
import {IRole} from '../types/IRole';
import {getCurrentUserDetails} from "./talentActions";

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
        dispatch<any>(fetchRolesForProject(projectId));
    };
}

export function castRole(projectId: string, id: string, userId: string) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});

        const res: { data: any } = await arAxios.put(`/api/v1/projects/${projectId}/roles/${id}/cast`, {userId});
        const role = res.data;
        dispatch({
            type: 'CAST_ROLE_SUCCESS',
        });
        dispatch<any>(fetchRolesForProject(projectId as any as number));
    };
}

export function fetchRolesForProject(projectId: number) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});

        const res: { data: any } = await arAxios.get(`/api/v1/projects/${projectId}/roles`);
        const {roles} = res.data;
        dispatch({
            type: ROLE_ACTIONS.FETCH_ROLES_SUCCESS,
            roles,
        });
    };
}

export function fetchRoleForProject(projectId: string, roleId: string) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});

        const res: { data: any } = await arAxios.get(`/api/v1/projects/${projectId}/roles/${roleId}`);
        const role = res.data;
        dispatch({
            type: "FETCH_ROLE_SUCCESS",
            role,
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
        const res: { data: any } = await arAxios.put(`/api/v1/projects/${projectId}/roles/${id}/document`, formData);
        dispatch({
            type: 'UPLOAD_DOCUMENT',
        });


        dispatch<any>(fetchRoleForProject(projectId, id));
    };
}
