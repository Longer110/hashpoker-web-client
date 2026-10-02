import service from '@/utils/request'
// @Tags ClubUser
// @Summary 创建ClubUser表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.ClubUser true "创建ClubUser表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /clubUser/createClubUser [post]
export const createClubUser = (data) => {
  return service({
    url: '/clubUser/createClubUser',
    method: 'post',
    data
  })
}

// @Tags ClubUser
// @Summary 删除ClubUser表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.ClubUser true "删除ClubUser表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /clubUser/deleteClubUser [delete]
export const deleteClubUser = (params) => {
  return service({
    url: '/clubUser/deleteClubUser',
    method: 'delete',
    params
  })
}

// @Tags ClubUser
// @Summary 批量删除ClubUser表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除ClubUser表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /clubUser/deleteClubUser [delete]
export const deleteClubUserByIds = (params) => {
  return service({
    url: '/clubUser/deleteClubUserByIds',
    method: 'delete',
    params
  })
}

// @Tags ClubUser
// @Summary 更新ClubUser表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.ClubUser true "更新ClubUser表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /clubUser/updateClubUser [put]
export const updateClubUser = (data) => {
  return service({
    url: '/clubUser/updateClubUser',
    method: 'put',
    data
  })
}

// @Tags ClubUser
// @Summary 用id查询ClubUser表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.ClubUser true "用id查询ClubUser表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /clubUser/findClubUser [get]
export const findClubUser = (params) => {
  return service({
    url: '/clubUser/findClubUser',
    method: 'get',
    params
  })
}

// @Tags ClubUser
// @Summary 分页获取ClubUser表列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取ClubUser表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /clubUser/getClubUserList [get]
export const getClubUserList = (params) => {
  return service({
    url: '/clubUser/getClubUserList',
    method: 'get',
    params
  })
}

// @Tags ClubUser
// @Summary 不需要鉴权的ClubUser表接口
// @Accept application/json
// @Produce application/json
// @Param data query dezhouReq.ClubUserSearch true "分页获取ClubUser表列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /clubUser/getClubUserPublic [get]
export const getClubUserPublic = () => {
  return service({
    url: '/clubUser/getClubUserPublic',
    method: 'get',
  })
}
