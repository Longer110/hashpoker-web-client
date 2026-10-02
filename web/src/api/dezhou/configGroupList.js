import service from '@/utils/request'
// @Tags ConfigGroupList
// @Summary 创建ConfigGroupList表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.ConfigGroupList true "创建ConfigGroupList表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /configGroupList/createConfigGroupList [post]
export const createConfigGroupList = (data) => {
  return service({
    url: '/configGroupList/createConfigGroupList',
    method: 'post',
    data
  })
}

// @Tags ConfigGroupList
// @Summary 删除ConfigGroupList表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.ConfigGroupList true "删除ConfigGroupList表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /configGroupList/deleteConfigGroupList [delete]
export const deleteConfigGroupList = (params) => {
  return service({
    url: '/configGroupList/deleteConfigGroupList',
    method: 'delete',
    params
  })
}

// @Tags ConfigGroupList
// @Summary 批量删除ConfigGroupList表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除ConfigGroupList表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /configGroupList/deleteConfigGroupList [delete]
export const deleteConfigGroupListByIds = (params) => {
  return service({
    url: '/configGroupList/deleteConfigGroupListByIds',
    method: 'delete',
    params
  })
}

// @Tags ConfigGroupList
// @Summary 更新ConfigGroupList表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.ConfigGroupList true "更新ConfigGroupList表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /configGroupList/updateConfigGroupList [put]
export const updateConfigGroupList = (data) => {
  return service({
    url: '/configGroupList/updateConfigGroupList',
    method: 'put',
    data
  })
}

// @Tags ConfigGroupList
// @Summary 用id查询ConfigGroupList表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.ConfigGroupList true "用id查询ConfigGroupList表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /configGroupList/findConfigGroupList [get]
export const findConfigGroupList = (params) => {
  return service({
    url: '/configGroupList/findConfigGroupList',
    method: 'get',
    params
  })
}

// @Tags ConfigGroupList
// @Summary 分页获取ConfigGroupList表列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取ConfigGroupList表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /configGroupList/getConfigGroupListList [get]
export const getConfigGroupListList = (params) => {
  return service({
    url: '/configGroupList/getConfigGroupListList',
    method: 'get',
    params
  })
}

// @Tags ConfigGroupList
// @Summary 不需要鉴权的ConfigGroupList表接口
// @Accept application/json
// @Produce application/json
// @Param data query dezhouReq.ConfigGroupListSearch true "分页获取ConfigGroupList表列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /configGroupList/getConfigGroupListPublic [get]
export const getConfigGroupListPublic = () => {
  return service({
    url: '/configGroupList/getConfigGroupListPublic',
    method: 'get',
  })
}
