import { login, logout, getUserInfo } from "@/api/user";
import router from "../../router";
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

export default {
  namespaced: true,
  state: {
    token: "",
    userId: "",
    userInfo: {},
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
    },
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
    logoutFn(state){
      state.token=''
    }
  },
  actions: {
    async getToken(context, payload) {
      // console.log(payload);
      const [a, b, c, d] = payload;
      // console.log(a);

      const res = await login(a, b, c, d);
      // console.log(res);
      context.commit("setToken", res);
      //注入id

      if (context.state.token) {
        // console.log(router);
        router.push("/");
      }
      // console.log(context);
    },
    async getUserInfos(context, payload) {
      
      const res = await getUserInfo(context.state.userId);
      // console.log(res);
      context.commit("setUserInfo", res.data);
    },
    logout(context){
      context.commit('logoutFn')
    }
  },
};
