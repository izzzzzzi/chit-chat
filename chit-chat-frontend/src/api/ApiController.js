// reference: https://velog.io/@subanggu/axios-interceptor-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0

import axios from 'axios'
import {API_BASE_LOGIN_URL, USER} from '../constants/index'

const instance = axios.create({
  withCredentials: true
});

instance.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json; charset=utf-8";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    // TODO: Need to check exception whether it's due to expired access token.
    if (status === 401) {
      const originalRequest = config;

      // token refresh 요청
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(
        `${API_BASE_LOGIN_URL}/api/v1/auth/refresh`,
        {
          headers: {
            Authorization: instance.defaults.headers.Authorization
          }
        }
      );

      console.log(data);

      if (data.body) {
        const newToken = `Bearer ${data.body.token}`;
        instance.defaults.headers.common.Authorization = newToken;
        originalRequest.headers.Authorization = newToken;

        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        return (await axios(originalRequest)).data;
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
