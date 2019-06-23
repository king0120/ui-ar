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
        dispatch<any>(fetchOrganization(org.id));
    };
}


export function fetchOrganization(id: number) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});

        const res: { data: IOrganization } = await arAxios.get(`api/v1/organizations/${id}`);
        const {projects, ...org} = res.data;
        dispatch({
            type: ORG_ACTIONS.FETCH_ORGANIZATION_SUCCESS,
            org,
            projects,
        });
    };
}

export function fetchAllOrganizations() {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});

        const res: { data: IOrganization } = await arAxios.get('api/v1/organizations');
        dispatch({
            type: ORG_ACTIONS.FETCH_ALL_ORGANIZATION_SUCCESS,
            organizations: res.data,
        });
    };
}
