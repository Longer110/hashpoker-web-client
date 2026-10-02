import service from '@/utils/request'

// 获取标签列表
export const getRemarkListApi = (params) => {
  return service({
    url: '/remark/getRemark',
    method: 'get',
    params
  })
}

// 添加标签
export const createRemarkApi = (data) => {
  return service({
    url: '/remark/createRemark',
    method: 'post',
    data
  })
}

// 修改标签
export const updateRemarkApi = (data) => {
  return service({
    url: '/remark/updateRemark',
    method: 'put',
    data
  })
}

// 删除标签
export const deleteRemarkApi = (data) => {
  return service({
    url: '/remark/delRemark',
    method: 'delete',
    data
  })
}
