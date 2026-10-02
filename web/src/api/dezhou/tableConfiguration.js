import service from '@/utils/request'
// 获取列表
export const getClubTableConfListApi = (params) => {
  return service({
    url: 'live/clubTableConfigList',
    method: 'get',
    params
    
  })
}
// 编辑牌桌配置
export const clubTableConfigEditApi = (data) => {
  return service({
    url: 'live/clubTableConfigEdit',
    method: 'post',
    data
    
  })
}

// 删除牌桌配置
export const clubTableConfigDeleteApi = (data) => {
  return service({
    url: 'live/clubTableConfigDelete',
    method: 'post',
    data
    
  })
}