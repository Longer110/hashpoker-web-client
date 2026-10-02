import service from '@/utils/request'

export const createScheduledTask = (data) => {
  return service({
    url: '/scheduledTask/createScheduledTask',
    method: 'post',
    data
  })
}

export const deleteScheduledTask = (params) => {
  return service({
    url: '/scheduledTask/deleteScheduledTask',
    method: 'delete',
    params
  })
}

export const deleteScheduledTaskByIds = (params) => {
  return service({
    url: '/scheduledTask/deleteScheduledTaskByIds',
    method: 'delete',
    params
  })
}

export const updateScheduledTask = (data) => {
  return service({
    url: '/scheduledTask/updateScheduledTask',
    method: 'put',
    data
  })
}

export const findScheduledTask = (params) => {
  return service({
    url: '/scheduledTask/findScheduledTask',
    method: 'get',
    params
  })
}

export const getScheduledTaskList = (params) => {
  return service({
    url: '/scheduledTask/getScheduledTaskList',
    method: 'get',
    params
  })
}

export const toggleTaskStatus = (params) => {
  return service({
    url: '/scheduledTask/toggleTaskStatus',
    method: 'put',
    params
  })
}

export const execTaskNow = (params) => {
  return service({
    url: '/scheduledTask/execTaskNow',
    method: 'post',
    params
  })
}

export const getScheduledTaskPublic = () => {
  return service({
    url: '/scheduledTask/getScheduledTaskPublic',
    method: 'get'
  })
}
