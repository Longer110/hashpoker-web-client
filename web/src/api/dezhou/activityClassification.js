import service from '@/utils/request'
// 获取活动分类
export const getActivityTypeListApi = (params) => {
  return service({
    url: '/activityType/getActivityTypeList',
    method: 'get',
    params
  })
}

export const deleteActivityTypeApi = (params) => {
  return service({
    url: '/activityType/deleteActivityType',
    method: 'delete',
    params
  })
}
// 创建活动分类
export const createActivityTypeApi = (data) => {
  return service({
    url: '/activityType/createActivityType',
    method: 'post',
    data
  })
}
export const updateActivityTypeApi = (data) => {
  return service({
    url: '/activityType/updateActivityType',
    method: 'put',
    data
  })
}

// 多选删除
export const deleteActivityTypeByIdsApi = (params) => {
  return service({
    url: '/activityType/deleteActivityTypeByIds',
    method: 'delete',
    params
  })
}
