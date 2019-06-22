import {Dispatch} from 'redux';
import arAxios from '../../axiosHelper';

export function getCurrentUserDetails() {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});

        const res: { data: any } = await arAxios.get(`/api/v1/users/me`);
        const user = res.data;
        dispatch({
            type: 'GET_CURRENT_USER_SUCCESS',
            user,
        });
    };
}

export function getProfileDetails(userId: any) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});

        const res: { data: any } = await arAxios.get(`/api/v1/users/${userId}`);
        const user = res.data;
        dispatch({
            type: 'GET_CURRENT_USER_SUCCESS',
            user,
        });
    };
}

export function addExperience(experienceType: string, experienceBody: any) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});

        await arAxios.post(`/api/v1/users/me/experiences/${experienceType}`, experienceBody);
        dispatch({
            type: 'ADD_EXPERIENCE_SUCCESS',
        });

        dispatch<any>(getCurrentUserDetails());
    };
}

export function removeExperience(experienceType: string, experienceId: any) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});

        await arAxios.delete(`/api/v1/users/me/experiences/${experienceType}/${experienceId}`);
        dispatch({
            type: 'DELETE_EXPERIENCE',
        });

        dispatch<any>(getCurrentUserDetails());
    };
}

export function uploadImage(file: File[]) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});
        const formData = new FormData();
        formData.append('upload', file[0]);
        await arAxios.post(`/api/v1/users/me/image`, formData);
        dispatch({
            type: 'UPLOAD_IMAGE',
        });

        dispatch<any>(getCurrentUserDetails());
    };
}

export function deleteImage(key: string) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});
        await arAxios.delete(`/api/v1/users/me/image`, {params: {key}});
        dispatch({
            type: 'DELETE_IMAGE',
        });

        dispatch<any>(getCurrentUserDetails());
    };
}

export function addUserBreakdown(breakdown: any) {
    return async (dispatch: Dispatch) => {
        dispatch({type: 'REQUEST_STARTED'});
        await arAxios.post(`/api/v1/users/me/breakdown`, breakdown);
        dispatch({
            type: 'ADD_USER_BREAKDOWN',
        });

        dispatch<any>(getCurrentUserDetails());
    };
}
