export const API_BASE_LOGIN_URL = 'http://localhost:8080';
export const API_BASE_USER_URL = 'http://localhost:8081';
export const ACCESS_TOKEN = 'accessToken';

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth/redirect'

export const GOOGLE_AUTH_URL = API_BASE_LOGIN_URL + '/oauth2/authorization/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_LOGIN_URL + '/oauth2/authorization/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = API_BASE_LOGIN_URL + '/oauth2/authorization/github?redirect_uri=' + OAUTH2_REDIRECT_URI;

export const ENNEAGRAM_TYPE = [
    '1w2', '2w1', '2w3', '3w2', '3w4', '4w3', '4w5', '5w4', '5w6',
    '6w5', '6w7', '7w6', '7w8', '8w7', '8w9', '9w8', '9w1', '1w9'
]

export const MBTI_TYPE = [
    "ISTJ", "ISFJ", "ISFP", "ISTP", "INFJ", "INTP", "INTJ", "INFP",
    "ESFP", "ESTP", "ESTJ", "ESFJ", "ENFJ", "ENFP", "ENTP", "ENTJ"
]

export const COLOR = [
    {type: "RED", rgb: "#FF0000"},
    {type: "BLUE", rgb: "#0000FF"}
]