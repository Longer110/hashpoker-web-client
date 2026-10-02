import service from '@/utils/request'
// @Tags Group
// @Summary 创建Group表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.Group true "创建Group表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /group/createGroup [post]
export const createGroup = (data) => {
  return service({
    url: '/group/createGroup',
    method: 'post',
    data
  })
}

// @Tags Group
// @Summary 删除Group表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.Group true "删除Group表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /group/deleteGroup [delete]
export const deleteGroup = (params) => {
  return service({
    url: '/group/deleteGroup',
    method: 'delete',
    params
  })
}

// @Tags Group
// @Summary 批量删除Group表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除Group表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /group/deleteGroup [delete]
export const deleteGroupByIds = (params) => {
  return service({
    url: '/group/deleteGroupByIds',
    method: 'delete',
    params
  })
}

// @Tags Group
// @Summary 更新Group表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.Group true "更新Group表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /group/updateGroup [put]
export const updateGroup = (data) => {
  return service({
    url: '/group/updateGroup',
    method: 'put',
    data
  })
}

// @Tags Group
// @Summary 用id查询Group表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.Group true "用id查询Group表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /group/findGroup [get]
export const findGroup = (params) => {
  return service({
    url: '/group/findGroup',
    method: 'get',
    params
  })
}

// @Tags Group
// @Summary 分页获取Group表列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取Group表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /group/getGroupList [get]
export const getGroupList = (params) => {
  return service({
    url: '/group/getGroupList',
    method: 'get',
    params
  })
}

// @Tags Group
// @Summary 不需要鉴权的Group表接口
// @Accept application/json
// @Produce application/json
// @Param data query dezhouReq.GroupSearch true "分页获取Group表列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /group/getGroupPublic [get]
export const getGroupPublic = () => {
  return service({
    url: '/group/getGroupPublic',
    method: 'get',
  })
}
