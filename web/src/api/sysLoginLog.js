import service from '@/utils/request'


// 获取登录日志
export const getUserLogonRecordListApi = (params) => {
  return service({
    url: 'userLogonRecord/getUserLogonRecordList',
    method: 'get',
    params
  })
}
