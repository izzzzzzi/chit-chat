import accountApi from '../../api/account'

export default {
  // 상태 값 관리
  state: {
    user: null,
    token: null
  },
  // 공통된 속성
  getters: {
    user: state => state.user,
    token: state => state.token
  },
  // actions
  actions: {
    fetchUser ({state, commit}, callback) {
      state.user
        ? callback && callback()
        : accountApi.getUser(
          res => {
            commit('setUser', res.user)
            callback && callback()
          }
        )
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setUser (state, user) {
      state.user = user
    }
  }
}
