import service from '@/utils/request'
// @Tags AccountsInFo
// @Summary 创建AccountsInFo表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.AccountsInFo true "创建AccountsInFo表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /accountsInFo/createAccountsInFo [post]
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
    url: '/accountsInFo/getAccountsAllInfo',
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
export const getAccountsInFoPublic = () => {
  return service({
    url: '/accountsInFo/getAccountsInFoPublic',
    method: 'get'
  })
}

// 处罚

export const penaltyAccountsInFoApi = (params) => {
  return service({
    url: '/accountsInFo/punishmentUser',
    method: 'get',
    params
  })
}
// 解封
export const unblockAccountsInFoApi = (params) => {
  return service({
    url: '/accountsInFo/unPunishmentUser',
    method: 'get',
    params
  })
}
// 封禁列表
export const getPunishmentUserListApi = (params) => {
  return service({
    url: '/accountsInFo/getPunishmentUserList',
    method: 'get',
    params
  })
}
// 解封
export const updateAccountsInFoFoApi = (data) => {
  return service({
    url: '/accountsInFo/updateAccountsInFo',
    method: 'PUT',
    data
  })
}

// 转账
export const onlineTransferApi = (data) => {
  return service({
    url: '/billRecord/onlineTransfer',
    method: 'post',
    data
  })
}

// 增减货币
export const changeGoldApi = (params) => {
  return service({
    url: '/accountsInFo/changeGold',
    method: 'get',
    params
  })
}

// 历史登录记录
export const historyLoginApi = (params) => {
  return service({
    url: '/userLogonRecord/getUserLogonRecordList',
    method: 'get',
    params
  })
}

// 历史昵称修改记录
export const nickNameHistoryApi = (params) => {
  return service({
    url: '/nickName/getNickNameHistory',
    method: 'get',
    params
  })
}
