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
    settingUserProfile(data, response, error) {
        ApiController({
            url: '/api/v1/users',
            method:'post',
            data: data
        })
        .then(response)
        .catch(error);
    },
    voteOtherUserType(data, response, error) {
    ApiController({
        // url: '/api/v1/',
        method: 'post',
        data: data,
    })
    .then(response)
    .catch(error);
},
}
