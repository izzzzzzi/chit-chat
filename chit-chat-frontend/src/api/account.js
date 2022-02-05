import index from './index'

const ACCOUNT_URI = {
  LOGIN: '/auth/login',
  USER: '/users'
}

export default {
  login (body, success, fail) {
    index.post(ACCOUNT_URI.LOGIN, body, success, fail)
  },
  getUser (success) {
    index.get(ACCOUNT_URI.USER, success)
  }
}
