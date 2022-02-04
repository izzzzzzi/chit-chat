// import accountApi from '@/api/account'

// action type 정의
const FATCH_USER = 'account/FATCH_USER';

// action 생성함수 정의
export const fatchUser = (user, token) => ({
    type: FATCH_USER,
    user,
    token
});

// 초기 상태 선언
const initialState = {
    user: null,
    token: null
};

// reducer 정의 *불변성 주의
export default function reducer(state=initialState, action) {
  switch (action.type) {
    case FATCH_USER:
      return {
        ...state,
        user: action.user,
        token: action.token,
      };
    default:return state;
  }
}

// const store = createStore(reducer);

// 스토어안에 들어있는 상태가 바뀔 때 마다 호출되는 listener 함수
// const listener = () => {
//   const state = store.getState();
//   console.log(state);
// };
//
// const unsubscribe = store.subscribe(listener);

// store.dispatch(fatchUser( 'hello','test'));

// export default function

// export default {
//   actions: {
//     fetchUser ({state, commit}, callback) {
//       state.user
//         ? callback && callback()
//         : accountApi.getUser(
//           res => {
//             commit('setUser', res.user)
//             callback && callback()
//           }
//         )
//     }
//   },
//   mutations: {
//     setToken (state, token) {
//       state.token = token
//     },
//     setUser (state, user) {
//       state.user = user
//     }
//   }
// }
