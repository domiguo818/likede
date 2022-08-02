import request from '@/utils/request'

/**
 * 提交登录
 * @param {Object} data
 * @returns promise
 */
 export function getCode(num) {
    return request({
      url: '/user-service/user/imageCode/'+num,
      
    })
  }

  /**
 * 提交登录
 * @param {Object} data
 * @returns promise
 */
 export function login(clientToken,code,loginName,password) {
  return request({
    url: '/user-service/user/login',
    data:{
      clientToken,
      code,
      loginName,
      loginType:0,
      password,
    },
    method:'POST'
    
  })
}