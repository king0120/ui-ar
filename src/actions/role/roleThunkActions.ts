import {Dispatch} from 'redux';
import {ROLE_ACTIONS} from './actions';
import arAxios from '../../axiosHelper';
import {IRole} from '../../types/IRole';

export function createProjectRole(projectId: number, newProjectRole: IRole) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});

        const res: { data: any } = await arAxios.post(`/api/v1/projects/${projectId}/roles`, newProjectRole);
        const role = res.data;
        dispatch({
            type: ROLE_ACTIONS.FETCH_ROLE_CREATE_SUCCESS,
            role,
        });
        fetchRolesForProject(projectId);
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
