import {IRole} from 'types/IRole';
import {Reducer} from 'redux';
import {ROLE_ACTIONS} from '../../actions/roleActions';

const initialState = {
    roles: []
};

export interface RoleState {
    roles?: IRole[];
}

const roleReducer: Reducer<any> = (state = initialState, action: any) => {
    switch (action.type) {
        case ROLE_ACTIONS.FETCH_ROLES_SUCCESS:
            return {
                ...state,
                roles: [...action.roles]
            };
        case "FETCH_ROLE_SUCCESS":
            return {
                role: action.role
            }
        default:
            return state;
    }
};
export default roleReducer;
