import service from '@/utils/request'

// 获取分组
export const getZhangBianTypeApi = (params) => {
  return service({
    url: '/userTreasureRecord/getChangeType',
    method: 'get',
    params
  })
}