import {Reducer} from 'redux';

const initialState = {
    loggedIn: false,
    initToken: false,
};

const userReducer: Reducer<any> = (state = initialState, action: any) => {
    switch (action.type) {
        case 'GET_CURRENT_USER_SUCCESS':
            return {
                user: action.user,
                loggedIn: true,
                initToken: true,
            };
        case 'USER_LOGIN_SUCCESS':
            return {
                user: action.user.user_id,
                loggedIn: true,
                initToken: true,
            };
        case 'USER_LOGIN_FAILURE':
            return {
                error: action.error,
                loggedIn: false,
                initToken: true,
            };
        case 'USER_LOGOUT_SUCCESS':
            return {
                user: {},
                loggedIn: false,
                initToken: true,
            };
        case 'CHECK_TOKEN_SUCCESS':
            return {
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
