import ApiController from "./ApiController";
import {
  API_BASE_LOGIN_URL,
  API_BASE_USER_URL,
  USER,
} from "../constants/index";

// ajax : axios (callback function matching)
// success : response
// fail : error
// complete : complete
export default {
  chatConnection(reponse, error, complete) {
    ApiController({
      url: `${API_BASE_USER_URL}/api/user/chat-random/join`,
      method: "get",
    })
    .then(reponse)
    .catch(error)
    .then(complete);
  },
  login(data, response, error) {
    ApiController({
      url: `${API_BASE_USER_URL}/api/v1/auth/login`,
      method: "post",
      data: data,
    })
    .then(response)
    .catch(error);
  },
  getCurrentUser(response) {
    ApiController({
      url: `${API_BASE_USER_URL}/api/v1/users`,
      method: "get",
    })
    .then(response);
  },
  settingUserProfile(data, response, error) {
    ApiController({
      url: `${API_BASE_USER_URL}/api/v1/users`,
      method: "post",
      data: data,
    })
    .then(response)
    .catch(error);
  },
  voteOtherUserType(data, response, error) {
    ApiController({
      url: `${API_BASE_USER_URL}/api/v1/users/ballot/vote`,
      method: "post",
      data: data,
    })
    .then(response)
    .catch(error);
  },
};
