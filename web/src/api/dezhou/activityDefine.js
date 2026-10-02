import service from '@/utils/request'
// @Tags ActivityDefine
// @Summary 创建ActivityDefine表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.ActivityDefine true "创建ActivityDefine表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /activityDefine/createActivityDefine [post]
export const createActivityDefine = (data) => {
  return service({
    url: '/activityDefine/createActivityDefine',
    method: 'post',
    data
  })
}

// @Tags ActivityDefine
// @Summary 删除ActivityDefine表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.ActivityDefine true "删除ActivityDefine表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /activityDefine/deleteActivityDefine [delete]
export const deleteActivityDefine = (params) => {
  return service({
    url: '/activityDefine/deleteActivityDefine',
    method: 'delete',
    params
  })
}

// @Tags ActivityDefine
// @Summary 批量删除ActivityDefine表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除ActivityDefine表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /activityDefine/deleteActivityDefine [delete]
export const deleteActivityDefineByIds = (params) => {
  return service({
    url: '/activityDefine/deleteActivityDefineByIds',
    method: 'delete',
    params
  })
}

// @Tags ActivityDefine
// @Summary 更新ActivityDefine表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.ActivityDefine true "更新ActivityDefine表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /activityDefine/updateActivityDefine [put]
export const updateActivityDefine = (data) => {
  return service({
    url: '/activityDefine/updateActivityDefine',
    method: 'put',
    data
  })
}

// @Tags ActivityDefine
// @Summary 用id查询ActivityDefine表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.ActivityDefine true "用id查询ActivityDefine表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /activityDefine/findActivityDefine [get]
export const findActivityDefine = (params) => {
  return service({
    url: '/activityDefine/findActivityDefine',
    method: 'get',
    params
  })
}

// @Tags ActivityDefine
// @Summary 分页获取ActivityDefine表列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取ActivityDefine表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /activityDefine/getActivityDefineList [get]
export const getActivityDefineList = (params) => {
  return service({
    url: '/activityDefine/getActivityDefineList',
    method: 'get',
    params
  })
}

// @Tags ActivityDefine
// @Summary 不需要鉴权的ActivityDefine表接口
// @Accept application/json
// @Produce application/json
// @Param data query dezhouReq.ActivityDefineSearch true "分页获取ActivityDefine表列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /activityDefine/getActivityDefinePublic [get]
export const getActivityDefinePublic = () => {
  return service({
    url: '/activityDefine/getActivityDefinePublic',
    method: 'get',
  })
}
