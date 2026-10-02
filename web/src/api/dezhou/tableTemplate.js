import service from '@/utils/request'

// 获取桌子模板列表
export const getDeskTemplateListApi = (params) => {
  return service({
    url: '/deskTemplate/getDeskTemplateList',
    method: 'get',
    params
  })
}

// 创建桌子模板
export const createDeskTemplateApi = (data) => {
  return service({
    url: '/deskTemplate/createDeskTemplate',
    method: 'post',
    data
  })
}

// 修改桌子模板
export const updateDeskTemplateApi = (data) => {
  return service({
    url: '/deskTemplate/updateDeskTemplate',
    method: 'put',
    data
  })
}

// 删除单个桌子模板
export const deleteDeskTemplateApi = (params) => {
  return service({
    url: '/deskTemplate/deleteDeskTemplate',
    method: 'delete',
    params
  })
}

// 删除多个桌子模板
export const deleteMultipleDeskTemplateApi = (params) => {
    return service({
      url: '/deskTemplate/deleteDeskTemplateByIds',
      method: 'delete',
      params
    })
  }
