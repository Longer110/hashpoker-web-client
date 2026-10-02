import service from '@/utils/request'
// @Tags GlobalConfig
// @Summary 创建全局配置表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.GlobalConfig true "创建全局配置表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /globalConfig/createGlobalConfig [post]
export const createGlobalConfig = (data) => {
  return service({
    url: '/globalConfig/createGlobalConfig',
    method: 'post',
    data
  })
}

// @Tags GlobalConfig
// @Summary 删除全局配置表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.GlobalConfig true "删除全局配置表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /globalConfig/deleteGlobalConfig [delete]
export const deleteGlobalConfig = (params) => {
  return service({
    url: '/globalConfig/deleteGlobalConfig',
    method: 'delete',
    params
  })
}

// @Tags GlobalConfig
// @Summary 批量删除全局配置表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除全局配置表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /globalConfig/deleteGlobalConfig [delete]
export const deleteGlobalConfigByIds = (params) => {
  return service({
    url: '/globalConfig/deleteGlobalConfigByIds',
    method: 'delete',
    params
  })
}

// @Tags GlobalConfig
// @Summary 更新全局配置表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.GlobalConfig true "更新全局配置表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /globalConfig/updateGlobalConfig [put]
export const updateGlobalConfig = (data) => {
  return service({
    url: '/globalConfig/updateGlobalConfig',
    method: 'put',
    data
  })
}

// @Tags GlobalConfig
// @Summary 用id查询全局配置表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.GlobalConfig true "用id查询全局配置表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /globalConfig/findGlobalConfig [get]
export const findGlobalConfig = (params) => {
  return service({
    url: '/globalConfig/findGlobalConfig',
    method: 'get',
    params
  })
}

// @Tags GlobalConfig
// @Summary 分页获取全局配置表列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取全局配置表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /globalConfig/getGlobalConfigList [get]
export const getGlobalConfigList = (params) => {
  return service({
    url: '/globalConfig/getGlobalConfigList',
    method: 'get',
    params
  })
}

// @Tags GlobalConfig
// @Summary 不需要鉴权的全局配置表接口
// @Accept application/json
// @Produce application/json
// @Param data query dezhouReq.GlobalConfigSearch true "分页获取全局配置表列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /globalConfig/getGlobalConfigPublic [get]
export const getGlobalConfigPublic = () => {
  return service({
    url: '/globalConfig/getGlobalConfigPublic',
    method: 'get',
  })
}
