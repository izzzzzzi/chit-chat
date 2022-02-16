import ApiController from './ApiController';


// ajax : axios (callback function matching)
// success : response
// fail : error
// complete : complete
export default {
    login(data, response, error) {
        ApiController({
            url: '/api/v1/auth/login',
            method: 'post',
            data: data,
        })
        .then(response)
        .catch(error);
    },
    getCurrentUser(response) {
        ApiController({
            url:'/api/v1/users',
            method: 'get'
        })
        .then(response);
    },
}

// export function login(loginRequest) {
//     return request({
//         url: API_BASE_URL + "/login",
//         method: 'POST',
//         body: JSON.stringify(loginRequest)
//     });
// }

