// @ts-nocheck
import { currentUser } from "@/service/api/api";

export default {
  state: {
    user: undefined,
  },

  effects: {
    *queryUser({ payload }, { call, put }) {
      const data: API.currentUser = yield call(currentUser, payload);
      if (data) {
        yield put({ type: "currentUserSuccess", payload: data });
      }
    },
  },

  reducers: {
    currentUserSuccess(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        user: payload,
      };
    },
  },

  test(state) {
    console.log("test");
    return state;
  },
};
