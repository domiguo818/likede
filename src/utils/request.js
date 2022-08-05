// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";
import router from "@/router";
import { getTokenTime } from "./auth";
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
}); // 创建一个axios的实例
// token过期处理超时封装
const isTimeout = () => {
  const currentTime = Date.now();
  const tokenTime = getTokenTime();
  const tomeout = 2 * 60 * 6 * 1000;
  return currentTime - tokenTime > tomeout;
};
request.interceptors.request.use(async (config) => {
  if (store.state.user.token) {
    if (isTimeout()) {
      await store.dispatch("user/logout");
      router.push("/login");
      return Promise.reject(new Error("登录过期"));
    } else {
      config.headers.Authorization = store.state.user.token;
    }
  }
  return config;
}); // 请求拦截器
request.interceptors.response.use(
  (res) => {
    // console.log(res);
    const isImg = res.config.url.indexOf("/api/user-service/user/imageCode/");

    // console.log(isImg);
    if (isImg === 0 || store.state.user.token) {
      return res;
    } else {
      const { token, success, msg } = res.data;
      if (success) {
        return res.data;
      }
      Message.error(msg);
      return Promise.reject(new Error(msg));
    }
  },
  async (error) => {
    if (error?.response?.status === 401) {
      Message.error("登录过期");
      await store.dispatch("user/logout");
      router.push("/login");
    } else {
      Message.error(error.message);
    }

    return Promise.reject(error);
  }

  // (res) => {
  //   const { token, success, msg } = res.data;
  //   if (success) {
  //     return token;
  //   }
  //   Message.error(msg);
  //   return Promise.reject(new Error(msg));
  // },
  // (error) => {
  //   Message.error("服务器异常");
  //   return Promise.reject(error);
  // }
); // 响应拦截器
export default request; // 导出axios实例
