import service from '@/utils/request'
// 财产记录
export const getUserTreasureRecordList = (params) => {
  return service({
    url: 'userTreasureRecord/getUserTreasureRecordList',
    method: 'get',
    params

  })
}
// 资金池-其它合计
export const getOtherChangeList = (params) => {
  return service({
    url: 'userTreasureRecord/getOtherChangeList',
    method: 'get',
    params

  })
}
// 其他合计-变化类型选项list
export const getOtherChangeType = (params) => {
  return service({
    url: 'userTreasureRecord/getOtherChangeType',
    method: 'get',
    params
  })
}
// 保险记录
export const getInSureList = (params) => {
  return service({
    url: 'transferLog/getInSureList',
    method: 'get',
    params

  })
}
// 保险记录看板
export const getRealtimeInSure = (params) => {
  return service({
    url: 'transferLog/getRealtimeInSure',
    method: 'get',
    params

  })
}
// 保险记录-赔付金额编辑
export const editInSureValue = (data) => {
  return service({
    url: 'transferLog/changeSecureOut',
    method: 'put',
    data
  })
}

// 涨变类型(游戏类型)
export const getChangeType = (params) => {
  return service({
    url: 'userTreasureRecord/getChangeType',
    method: 'get',
    params
  })
}
