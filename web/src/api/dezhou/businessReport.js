import service from '@/utils/request'
// 获取首页统计数据
export const getStatisticsDashboardApi = (params) => {
  return service({
    url: '/transferLog/getTradeSummary',
    method: 'get',
    params
  })
}

// 获取平均同时在线数据
export const getAvgOnlineUserApi = (params) => {
  return service({
    url: '/report/getAvgOnlineUser',
    method: 'get',
    params
  })
}

// 获取最高同时在线用户数据
export const getMaxOnlineUserApi = (params) => {
  return service({
    url: '/report/getMaxOnlineUser',
    method: 'get',
    params
  })
}
