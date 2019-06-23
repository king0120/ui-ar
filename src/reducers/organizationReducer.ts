import {IOrganization} from '../types/IOrganization';
import {Reducer} from 'redux';
import {ORG_ACTIONS} from '../actions/organizationActions';

const initialState = {
    organizations: [],
    organization: undefined,
};

const organizationReducer: Reducer<OrganizationState> = (state = initialState, action: any) => {
    switch (action.type) {
        case ORG_ACTIONS.FETCH_ALL_ORGANIZATION_SUCCESS:
            return {
                ...state,
                organizations: action.organizations
            };
        case ORG_ACTIONS.FETCH_ORGANIZATION_SUCCESS:
            return {
                ...state,
                organization: action.org
            };
        default:
            return state;
    }
};

export interface OrganizationState {
    organization?: IOrganization;
}

export default organizationReducer;
