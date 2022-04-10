import ApiController from "./ApiController";
import {
  API_BASE_LOGIN_URL,
  API_BASE_USER_URL
} from "../constants/index";

// ajax : axios (callback function matching)
// success : response
// fail : error
// complete : complete
export default {
  chatConnection(reponse, error, complete) {
    ApiController({
      url: `${API_BASE_USER_URL}/chat-random/join`,
      method: "get",
    })
    .then(reponse)
    .catch(error)
    .then(complete);
  },
  login(data, response, error) {
    ApiController({
      url: `${API_BASE_LOGIN_URL}/login`,
      method: "post",
      data: data,
    })
    .then(response)
    .catch(error);
  },
  getCurrentUser(response) {
    ApiController({
      url: `${API_BASE_USER_URL}/user`,
      method: "get",
    })
    .then(response);
  },
  settingUserProfile(data, response, error) {
    ApiController({
      url: `${API_BASE_USER_URL}/user`,
      method: "post",
      data: data,
    })
    .then(response)
    .catch(error);
  },
  voteOtherUserType(data, response, error) {
    ApiController({
      url: `${API_BASE_USER_URL}/ballot/vote`,
      method: "post",
      data: data,
    })
    .then(response)
    .catch(error);
  },
};
