import { currentUser } from "@/service/api/api";

 
export default {
  state: {
    user: {},
  },
 
  effects: {
    *queryUser({ payload }, { call, put }) {
      const data = yield call(currentUser, payload);
      console.log(data)
      yield put({ type: 'currentUserSuccess', payload: data });
    },
  },
 
  reducers: {
    currentUserSuccess(state, { payload }) {
      console.log(payload)
      return {
        ...state,
        user: payload,
      };
    },
  },
 
  test(state) {
    console.log('test');
    return state;
  },
};