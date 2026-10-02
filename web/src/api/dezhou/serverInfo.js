import service from '@/utils/request'
// @Tags ServerInfo
// @Summary 创建ServerInfo表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.ServerInfo true "创建ServerInfo表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /serverInfo/createServerInfo [post]
export const createServerInfo = (data) => {
  return service({
    url: '/serverInfo/createServerInfo',
    method: 'post',
    data
  })
}

// @Tags ServerInfo
// @Summary 删除ServerInfo表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.ServerInfo true "删除ServerInfo表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /serverInfo/deleteServerInfo [delete]
export const deleteServerInfo = (params) => {
  return service({
    url: '/serverInfo/deleteServerInfo',
    method: 'delete',
    params
  })
}

// @Tags ServerInfo
// @Summary 批量删除ServerInfo表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除ServerInfo表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /serverInfo/deleteServerInfo [delete]
export const deleteServerInfoByIds = (params) => {
  return service({
    url: '/serverInfo/deleteServerInfoByIds',
    method: 'delete',
    params
  })
}

// @Tags ServerInfo
// @Summary 更新ServerInfo表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.ServerInfo true "更新ServerInfo表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /serverInfo/updateServerInfo [put]
export const updateServerInfo = (data) => {
  return service({
    url: '/serverInfo/updateServerInfo',
    method: 'put',
    data
  })
}

// @Tags ServerInfo
// @Summary 用id查询ServerInfo表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.ServerInfo true "用id查询ServerInfo表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /serverInfo/findServerInfo [get]
export const findServerInfo = (params) => {
  return service({
    url: '/serverInfo/findServerInfo',
    method: 'get',
    params
  })
}

// @Tags ServerInfo
// @Summary 分页获取ServerInfo表列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取ServerInfo表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /serverInfo/getServerInfoList [get]
export const getServerInfoList = (params) => {
  return service({
    url: '/serverInfo/getServerInfoList',
    method: 'get',
    params
  })
}

// @Tags ServerInfo
// @Summary 不需要鉴权的ServerInfo表接口
// @Accept application/json
// @Produce application/json
// @Param data query dezhouReq.ServerInfoSearch true "分页获取ServerInfo表列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /serverInfo/getServerInfoPublic [get]
export const getServerInfoPublic = () => {
  return service({
    url: '/serverInfo/getServerInfoPublic',
    method: 'get',
  })
}
