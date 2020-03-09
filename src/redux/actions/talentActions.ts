import { Dispatch } from 'redux';
import arAxios from '../../utils/axiosHelper';

export function uploadImage(file: File[]) {
  return async (dispatch: Dispatch) => {
    dispatch({ type: 'REQUEST_STARTED' });
    const formData = new FormData();
    formData.append('upload', file[0]);
    await arAxios.post(`/api/v1/users/me/image`, formData);
    dispatch({
      type: 'UPLOAD_IMAGE'
    });
  };
}

export function deleteImage(key: string) {
  return async (dispatch: Dispatch) => {
    dispatch({ type: 'REQUEST_STARTED' });
    await arAxios.delete(`/api/v1/users/me/image`, { params: { key } });
    dispatch({
      type: 'DELETE_IMAGE'
    });
  };
}

export function addUserBreakdown(breakdown: any) {
  return async (dispatch: Dispatch) => {
    dispatch({ type: 'REQUEST_STARTED' });
    await arAxios.post(`/api/v1/users/me/breakdown`, breakdown);
    dispatch({
      type: 'ADD_USER_BREAKDOWN'
    });
  };
}
