import { API_BASE_URL, ACCESS_TOKEN } from '../constants';
import req from './req-wrapper'

const ACCOUNT_URI = {
    LOGIN: '/auth/login',
    USER: '/users'
}

export default {
    login (body, success, fail) {
        req.post(ACCOUNT_URI.LOGIN, body, success, fail)
    },
    getCurrentUser (success) {
        req.get(ACCOUNT_URI.USER, success)
    },
}

// export function login(loginRequest) {
//     return request({
//         url: API_BASE_URL + "/login",
//         method: 'POST',
//         body: JSON.stringify(loginRequest)
//     });
// }

