import service from '@/utils/request'
// 转账管理
export const getBillRecordListApi = (params) => {
  return service({
    url: '/billRecord/getBillRecordList',
    method: 'get',
    params
  })
}

// 获取转账日志
export const getTransferLogListApi = (params) => {
  return service({
    url: '/transferLog/getTransferLogList',
    method: 'get',
    params
  })
}

// 获取充值订单列表
export const getPayListApi = (params) => {
  return service({
    url: '/transferLog/getPayList',
    method: 'get',
    params
  })
}

// 获取提现订单列表
export const getWithdrawListApi = (params) => {
  return service({
    url: '/transferLog/getWithdrawList',
    method: 'get',
    params
  })
}


// 保险记录列表
export const getInSureList = (params) => {
  return service({
    url: '/transferLog/getInSureList',
    method: 'get',
    params
  })
}

//获取抽水记录列表
export const getPumpList = (params) => {
  return service({
    url: '/transferLog/getChouShuiList',
    method: 'get',
    params
  })
}

export const getWithdrawPendingListApi = (params) => {
  return service({
    url: '/transferLog/withdrawPending',
    method: 'get',
    params
  })
}

export const auditWithdrawApi = (data) => {
  return service({
    url: '/transferLog/auditWithdraw',
    method: 'post',
    data
  })
}