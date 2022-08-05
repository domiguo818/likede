import request from "@/utils/request";

/**
 * 获取图片验证码
 * @param {Object} data
 * @returns promise
 */
export function getCode(num) {
  return request({
    url: "/user-service/user/imageCode/" + num,
  });
}

/**
 * 登录
 * @param {Object} data
 * @returns promise
 */
export function login(clientToken, code, loginName, password) {
  return request({
    url: "/user-service/user/login",
    data: {
      clientToken,
      code,
      loginName,
      loginType: 0,
      password,
    },
    method: "POST",
  });
}

/**
 * 获取用户信息
 * @param {Object} data
 * @returns promise
 */
export function getUserInfo(id) {
  return request({
    url: "/user-service/user/" + id,
  });
}
