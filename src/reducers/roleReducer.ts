import {IRole} from '../types/IRole';
import {Reducer} from 'redux';
import {ROLE_ACTIONS} from '../actions/role/actions';

const initialState = {
    roles: []
};

export interface RoleState {
    roles?: IRole[];
}

const roleReducer: Reducer<RoleState> = (state = initialState, action: any) => {
    switch (action.type) {
        case ROLE_ACTIONS.FETCH_ROLES_SUCCESS:
            return {
                ...state,
                roles: [...action.roles]
            };
        default:
            return state;
    }
};
export default roleReducer;
