import service from '@/utils/request'
// @Tags Club
// @Summary 创建Club表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.Club true "创建Club表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /club/createClub [post]
export const createClub = (data) => {
  return service({
    url: '/club/createClub',
    method: 'post',
    data
  })
}

// @Tags Club
// @Summary 删除Club表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.Club true "删除Club表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /club/deleteClub [delete]
export const deleteClub = (params) => {
  return service({
    url: '/club/deleteClub',
    method: 'delete',
    params
  })
}

// @Tags Club
// @Summary 批量删除Club表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除Club表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /club/deleteClub [delete]
export const deleteClubByIds = (params) => {
  return service({
    url: '/club/deleteClubByIds',
    method: 'delete',
    params
  })
}

// @Tags Club
// @Summary 更新Club表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.Club true "更新Club表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /club/updateClub [put]
export const updateClub = (data) => {
  return service({
    url: '/club/updateClub',
    method: 'put',
    data
  })
}

// @Tags Club
// @Summary 用id查询Club表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.Club true "用id查询Club表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /club/findClub [get]
export const findClub = (params) => {
  return service({
    url: '/club/findClub',
    method: 'get',
    params
  })
}

// @Tags Club
// @Summary 分页获取Club表列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取Club表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /club/getClubList [get]
export const getClubList = (params) => {
  return service({
    url: '/club/getClubList',
    method: 'get',
    params
  })
}

// @Tags Club
// @Summary 不需要鉴权的Club表接口
// @Accept application/json
// @Produce application/json
// @Param data query dezhouReq.ClubSearch true "分页获取Club表列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /club/getClubPublic [get]
export const getClubPublic = () => {
  return service({
    url: '/club/getClubPublic',
    method: 'get',
  })
}

// @Tags Club
// @Summary 重新生成俱乐部邀请码
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param id query int true "表主键id"
// @Success 200 {string} string "{"code":0,"data":{"InviteCode":"xxx"},"msg":"生成成功"}"
// @Router /club/resetInviteCode [put]
export const resetInviteCode = (params) => {
  return service({
    url: '/club/resetInviteCode',
    method: 'put',
    params
  })
}

// @Tags Club
// @Summary 用邀请码查询俱乐部
// @Accept application/json
// @Produce application/json
// @Param InviteCode query string true "邀请码"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /club/findClubByInviteCode [get]
export const findClubByInviteCode = (params) => {
  return service({
    url: '/club/findClubByInviteCode',
    method: 'get',
    params
  })
}
