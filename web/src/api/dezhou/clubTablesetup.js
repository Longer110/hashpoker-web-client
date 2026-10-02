import service from '@/utils/request'
// 查询俱乐部桌子配置
export const getClubTableApi = (params) => {
  return service({
    url: 'live/clubTableConfList',
    method: 'get',
    params,
  })
}


export const createAccountsInFo = (data) => {
  return service({
    url: '/accountsInFo/createAccountsInFo',
    method: 'post',
    data
  })
}

// @Tags AccountsInFo
// @Summary 删除AccountsInFo表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.AccountsInFo true "删除AccountsInFo表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /accountsInFo/deleteAccountsInFo [delete]
export const deleteAccountsInFo = (params) => {
  return service({
    url: '/accountsInFo/deleteAccountsInFo',
    method: 'delete',
    params
  })
}

// @Tags AccountsInFo
// @Summary 批量删除AccountsInFo表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除AccountsInFo表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /accountsInFo/deleteAccountsInFo [delete]
export const deleteAccountsInFoByIds = (params) => {
  return service({
    url: '/accountsInFo/deleteAccountsInFoByIds',
    method: 'delete',
    params
  })
}

// @Tags AccountsInFo
// @Summary 更新AccountsInFo表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.AccountsInFo true "更新AccountsInFo表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /accountsInFo/updateAccountsInFo [put]
export const updateAccountsInFo = (data) => {
  return service({
    url: '/accountsInFo/updateAccountsInFo',
    method: 'put',
    data
  })
}

// @Tags AccountsInFo
// @Summary 用id查询AccountsInFo表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.AccountsInFo true "用id查询AccountsInFo表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /accountsInFo/findAccountsInFo [get]
export const findAccountsInFo = (params) => {
  return service({
    url: '/accountsInFo/findAccountsInFo',
    method: 'get',
    params
  })
}

// @Tags AccountsInFo
// @Summary 分页获取AccountsInFo表列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取AccountsInFo表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /accountsInFo/getAccountsInFoList [get]
export const getAccountsInFoList = (params) => {
  return service({
    url: '/accountsInFo/getAccountsInFoList',
    method: 'get',
    params
  })
}

// @Tags AccountsInFo
// @Summary 不需要鉴权的AccountsInFo表接口
// @Accept application/json
// @Produce application/json
// @Param data query dezhouReq.AccountsInFoSearch true "分页获取AccountsInFo表列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /accountsInFo/getAccountsInFoPublic [get]

// 俱乐部桌子配置新增
export const createClubTableConfApi = (data) => {
  return service({
    url: '/live/clubTableConfCreate',
    method: 'post',
    data
  })
}

// 俱乐部桌子配置编辑
export const updateClubTableConfApi = (data) => {
  return service({
    url: '/live/clubTableConfUpdate',
    method: 'post',
    data
  })
}

// 俱乐部桌子配置删除
export const deleteClubTableConfApi = (params) => {
  return service({
    url: '/live/clubTableConfDelete',
    method: 'get',
    params
  })
} 