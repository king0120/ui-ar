import axios from 'axios';

const arAxios = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://aud-rev-test.herokuapp.com/' : '/',
});

const accessToken = localStorage.getItem('access_token');
if (accessToken) {
    arAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

export default arAxios;
