// reference: https://velog.io/@subanggu/axios-interceptor-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0

import axios from 'axios'
import {API_BASE_LOGIN_URL, ACCESS_TOKEN} from '../constants/index'

const instance = axios.create({
  baseURL: `${API_BASE_LOGIN_URL}`,
  timeout: 2500
});

instance.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json; charset=utf-8";
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data.body;
  },
  function (error) {
    return Promise.reject(error);
  }
)

export default instance;
