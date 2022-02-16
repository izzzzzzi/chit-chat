// reference: https://velog.io/@subanggu/axios-interceptor-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0

import axios from 'axios'
import {API_BASE_URL, ACCESS_TOKEN} from '../constants/index'

const instance = axios.create({
  baseURL: `${API_BASE_URL}`,
  timeout: 2500
});

instance.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json; charset=utf-8";
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`;
    return config;
  },
  function (error) {
<<<<<<< HEAD
    return error;
=======
    return Promise.reject(error);
>>>>>>> ed37104276e7cdd6e688f1a1bd897ef7509599c6
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data.body;
  },
  function (error) {
<<<<<<< HEAD
    return error;
=======
    return Promise.reject(error);
>>>>>>> ed37104276e7cdd6e688f1a1bd897ef7509599c6
  }
)

export default instance;
