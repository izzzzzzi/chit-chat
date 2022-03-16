// reference: https://velog.io/@subanggu/axios-interceptor-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0

import axios from 'axios'
import {API_BASE_LOGIN_URL, API_BASE_USER_URL, ACCESS_TOKEN, USER} from '../constants/index'

const instance = axios.create({
  withCredentials: true,
  baseURL: `${API_BASE_USER_URL}`,
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
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === 401 && localStorage.getItem(ACCESS_TOKEN)) {
      const originalRequest = config;

      // token refresh 요청
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(
        `${API_BASE_LOGIN_URL}/api/v1/auth/refresh`,
        {headers: {Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}}
      );

      console.log(data);

      if (data.body) {
        // TODO: Have to set access to private variable instead of localStorage for security
        // 새로운 토큰 저장
        localStorage.setItem(ACCESS_TOKEN, data.body.token);

        axios.defaults.headers.common.Authorization = `Bearer ${data.body.token}`;
        originalRequest.headers.Authorization = `Bearer ${data.body.token}`;

        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        return (await axios(originalRequest)).data.body;
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
