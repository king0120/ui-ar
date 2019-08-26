import {Dispatch} from 'redux';
import arAxios from '../utils/axiosHelper';
import {IOrganization} from '../types/IOrganization';

export enum ORG_ACTIONS {
    FETCH_ALL_ORGANIZATION_SUCCESS = 'FETCH_ALL_ORGANIZATION_SUCCESS',
    FETCH_ORGANIZATION_SUCCESS = 'FETCH_ORGANIZATION_SUCCESS',
    FETCH_ORGANIZATION_CREATE_SUCCESS = 'FETCH_ORGANIZATION_CREATE_SUCCESS',
    FETCH_ORGANIZATION_EDIT_SUCCESS = 'FETCH_ORGANIZATION_EDIT_SUCCESS',
    FETCH_ORGANIZATION_DELETE_SUCCESS = 'FETCH_ORGANIZATION_DELETE_SUCCESS',
}


export function createOrganization(orgBody: any) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});

        const res: { data: IOrganization } = await arAxios.post(`api/v1/organizations`, orgBody);
        const org = res.data;
        dispatch({
            type: ORG_ACTIONS.FETCH_ORGANIZATION_CREATE_SUCCESS,
            org,
        });
    };
}

export function editOrganization(id: any, orgBody: any) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});

        const res: { data: IOrganization } = await arAxios.put(`api/v1/organizations/${id}`, orgBody);
        const org = res.data;
        dispatch({
            type: ORG_ACTIONS.FETCH_ORGANIZATION_EDIT_SUCCESS,
            org,
        });
    };
}

export function deleteOrganization(id: number) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});

        await arAxios.delete(`api/v1/organizations/${id}`);

        dispatch({
            type: ORG_ACTIONS.FETCH_ORGANIZATION_DELETE_SUCCESS,
        });
    };
}


export function addMemberToOrganization(id: number, memberId: string) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});

        await arAxios.put(`api/v1/organizations/${id}/member`, {memberId});

        dispatch({
            type: 'ADD_MEMBER_TO_ORG_SUCCESS',
        });
    };
}

export function removeMemberFromOrganization(id: number, memberId: string) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});

        await arAxios.put(`api/v1/organizations/${id}/removeMember`, {memberId});

        dispatch({
            type: 'REMOVE_MEMBER_TO_ORG_SUCCESS',
        });
    };
}
