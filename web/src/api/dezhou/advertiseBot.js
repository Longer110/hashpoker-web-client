import service from '@/utils/request'
// @Tags AdvertiseBot
// @Summary 创建AdvertiseBot表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.AdvertiseBot true "创建AdvertiseBot表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /advertiseBot/createAdvertiseBot [post]
export const createAdvertiseBot = (data) => {
  return service({
    url: '/advertiseBot/createAdvertiseBot',
    method: 'post',
    data
  })
}

// @Tags AdvertiseBot
// @Summary 删除AdvertiseBot表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.AdvertiseBot true "删除AdvertiseBot表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /advertiseBot/deleteAdvertiseBot [delete]
export const deleteAdvertiseBot = (params) => {
  return service({
    url: '/advertiseBot/deleteAdvertiseBot',
    method: 'delete',
    params
  })
}

// @Tags AdvertiseBot
// @Summary 批量删除AdvertiseBot表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除AdvertiseBot表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /advertiseBot/deleteAdvertiseBot [delete]
export const deleteAdvertiseBotByIds = (params) => {
  return service({
    url: '/advertiseBot/deleteAdvertiseBotByIds',
    method: 'delete',
    params
  })
}

// @Tags AdvertiseBot
// @Summary 更新AdvertiseBot表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.AdvertiseBot true "更新AdvertiseBot表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /advertiseBot/updateAdvertiseBot [put]
export const updateAdvertiseBot = (data) => {
  return service({
    url: '/advertiseBot/updateAdvertiseBot',
    method: 'put',
    data
  })
}

// @Tags AdvertiseBot
// @Summary 用id查询AdvertiseBot表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.AdvertiseBot true "用id查询AdvertiseBot表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /advertiseBot/findAdvertiseBot [get]
export const findAdvertiseBot = (params) => {
  return service({
    url: '/advertiseBot/findAdvertiseBot',
    method: 'get',
    params
  })
}

// @Tags AdvertiseBot
// @Summary 分页获取AdvertiseBot表列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取AdvertiseBot表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /advertiseBot/getAdvertiseBotList [get]
export const getAdvertiseBotList = (params) => {
  return service({
    url: '/advertiseBot/getAdvertiseBotList',
    method: 'get',
    params
  })
}

// @Tags AdvertiseBot
// @Summary 不需要鉴权的AdvertiseBot表接口
// @Accept application/json
// @Produce application/json
// @Param data query dezhouReq.AdvertiseBotSearch true "分页获取AdvertiseBot表列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /advertiseBot/getAdvertiseBotPublic [get]
export const getAdvertiseBotPublic = () => {
  return service({
    url: '/advertiseBot/getAdvertiseBotPublic',
    method: 'get',
  })
}


// 机器人图片上传
