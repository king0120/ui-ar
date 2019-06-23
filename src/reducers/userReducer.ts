import {Reducer} from 'redux';

const initialState = {
    loggedIn: false,
    initToken: false,
    me: {}
};

const userReducer: Reducer<any> = (state = initialState, action: any) => {
    switch (action.type) {
        case 'GET_USER_SUCCESS':
            return {
                ...state,
                user: action.user,
                loggedIn: true,
                initToken: true,
            };
        case 'GET_CURRENT_USER_SUCCESS':
            return {
                ...state,
                me: action.user,
                user: action.user,
                loggedIn: true,
                initToken: true,
            };
        case 'USER_LOGIN_SUCCESS':
            return {
                ...state,
                user: action.user.user_id,
                me: action.user.user_id,
                loggedIn: true,
                initToken: true,
            };
        case 'USER_LOGIN_FAILURE':
            return {
                ...state,
                error: action.error,
                loggedIn: false,
                initToken: true,
            };
        case 'USER_LOGOUT_SUCCESS':
            return {
                ...state,
                me: {},
                loggedIn: false,
                initToken: true,
            };
        case 'CHECK_TOKEN_SUCCESS':
            return {
                me: action.user,
                user: action.user,
                loggedIn: true,
                initToken: true,
            };
        case 'CHECK_TOKEN_FAILURE':
            return {
                loggedIn: false,
                initToken: true,
            };
        default:
            return state;
    }
};
export default userReducer;
