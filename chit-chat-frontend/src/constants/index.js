export const API_BASE_LOGIN_URL = 'http://localhost:8080';
export const API_BASE_USER_URL = 'http://localhost:8081';
export const ACCESS_TOKEN = 'accessToken';

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth/redirect'

export const GOOGLE_AUTH_URL = API_BASE_LOGIN_URL + '/oauth2/authorization/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_LOGIN_URL + '/oauth2/authorization/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = API_BASE_LOGIN_URL + '/oauth2/authorization/github?redirect_uri=' + OAUTH2_REDIRECT_URI;
