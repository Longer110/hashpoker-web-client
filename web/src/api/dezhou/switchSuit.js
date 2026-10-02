import service from '@/utils/request'
// 获取开关服列表
export const getServerStateApi = (params) => {
  return service({
    url: '/serverInfo/getServerState',
    method: 'get',
    params
  })
}
// 开关服配置
export const closeOpenServerApi = (params) => {
  return service({
    url: '/serverInfo/closeOpenServer',
    method: 'get',
    params
  })
}
