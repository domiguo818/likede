import { login, logout, getInfo } from "@/api/user";
import router from '../../router'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

export default {
  namespaced: true,
  state: {
    token: "",
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    async getToken(context, payload) {
      // console.log(payload);
      const [a, b, c, d] = payload;
      // console.log(a);

      const res = await login(a, b, c, d);
      context.commit("setToken", res.data.token);
    if (context.state.token){
      // console.log(router);
      router.push('/')
    }
      console.log(context);
    },
  },
};
