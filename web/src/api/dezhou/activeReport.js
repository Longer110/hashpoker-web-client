import service from '@/utils/request'
// 活跃用户统计列表
export const getActiveUserApi = (params) => {
  return service({
    url: '/report/getActiveUser',
    method: 'get',
    params
  })
}

// 新用户留存
export const getRetain2 = (params) => {
  return service({
    url: '/report/getRetain2',
    method: 'get',
    params
  })
}