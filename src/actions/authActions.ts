import {Dispatch} from 'redux';
import arAxios from '../utils/axiosHelper';

export function logIn(userLogin: any) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});

        try {
            const res: { data: any } = await arAxios.post(`/auth/login`, userLogin);
            const user = res.data;
            arAxios.defaults.headers.common.Authorization = `Bearer ${user.access_token}`;
            localStorage.setItem('access_token', user.access_token);
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

export function register(userLogin: any) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});

        try {
            await arAxios.post('/auth/register', userLogin)
            const res: { data: any } = await arAxios.post(`/auth/login`, userLogin);
            const user = res.data;
            arAxios.defaults.headers.common.Authorization = `Bearer ${user.access_token}`;
            localStorage.setItem('access_token', user.access_token);
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

export function logOut() {
    localStorage.removeItem('access_token');
    arAxios.defaults.headers.common.Authorization = ``;
    return {
        type: 'USER_LOGOUT_SUCCESS'
    };
}

export function tokenCheck() {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});

        try {
            const res: { data: any } = await arAxios.get(`/auth/tokenCheck`);
            const user = res.data;
            dispatch({
                type: 'CHECK_TOKEN_SUCCESS',
                user,
            });
        } catch (err) {
            dispatch({
                type: 'CHECK_TOKEN_FAILURE',
            });
        }

    };
}
