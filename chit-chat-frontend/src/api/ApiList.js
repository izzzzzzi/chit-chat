import UserApiController from './UserApiController';
import ChatApiController from './ChatApiController'


// ajax : axios (callback function matching)
// success : response
// fail : error
// complete : complete
export default {
    chatConnection(reponse, error, complete) {
        ChatApiController({
            url: '/api/user/chat-random/join', // TODO: have to check this url later
            method: 'get',
        })
        .then(reponse)
        .catch(error)
        .then(complete)
    },
    login(data, response, error) {
        UserApiController({
            url: '/api/v1/auth/login',
            method: 'post',
            data: data,
        })
        .then(response)
        .catch(error);
    },
    getCurrentUser(response) {
        UserApiController({
            url:'/api/v1/users',
            method: 'get'
        })
        .then(response);
    },
    settingUserProfile(data, response, error) {
        UserApiController({
            url: '/api/v1/users',
            method:'post',
            data: data
        })
        .then(response)
        .catch(error);
    },
    voteOtherUserType(data, response, error) {
    UserApiController({
        url: '/api/v1/users/ballot/vote',
        method: 'post',
        data: data,
    })
    .then(response)
    .catch(error);
},
}
