import service from '@/utils/request'
// 获取分组
export const getGlobalGroupingApi = (params) => {
  return service({
    url: '/configGroupList/getConfigGroupListList',
    method: 'get',
    params
  })
}
// 获取游戏
export const getGlobalGameApi = (params) => {
  return service({
    url: '/configGroupList/getGameList',
    method: 'get',
    params
  })
}
