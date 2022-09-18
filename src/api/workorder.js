import request from "@/utils/request";
/**
 * 获取图片验证码
 * @param {Object} data
 * @returns promise
 */
export function getWorkOrderList(pageIndex, pageSize, isRepair) {
  return request({
    url: "/task-service/task/search",
    params: {
      pageIndex,
      pageSize,
      isRepair,
    },
  });
}
