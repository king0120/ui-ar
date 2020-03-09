import axios from 'axios';

const arAxios = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://www.auditionrevolution.com/'
      : '/'
});

const accessToken = localStorage.getItem('accessToken');
if (accessToken) {
  arAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

export default arAxios;
