import {Dispatch} from 'redux';
import arAxios from '../utils/axiosHelper';

export function register(userLogin: any) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});

        try {
            await arAxios.post('/auth/register', userLogin)
            const res: { data: any } = await arAxios.post(`/auth/login`, userLogin);
            const user = res.data;
            arAxios.defaults.headers.common.Authorization = `Bearer ${user.accessToken}`;
            localStorage.setItem('accessToken', user.accessToken);
            dispatch({
                type: 'USER_LOGIN_SUCCESS',
                user,
            });
        } catch (err) {
            dispatch({
                type: 'USER_LOGIN_FAILURE',
                error: err.response.data.message
            });
            throw err
        }
    };
}
