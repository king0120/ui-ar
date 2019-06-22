import {Dispatch} from 'redux';
import {ORG_ACTIONS} from './actions';
import arAxios from '../../axiosHelper';
import {IOrganization} from '../../types/IOrganization';

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
