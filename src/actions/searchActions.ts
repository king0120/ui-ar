import {Dispatch} from 'redux';
import arAxios from '../utils/axiosHelper';

export function searchUsers(params: any) {
    console.log(params)
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});
        const results = await arAxios.get(`/api/v1/users/search`, {
            params,
        });
        dispatch({
            type: 'SEARCH_USER_SUCCESS',
            data: results.data
        });
    };
}
