import service from '@/utils/request'

// @Summary 创建

export const createCreateClubRoomApi = (data) => {
  return service({
    url: '/live/createClubRoom',
    method: 'post',
    data
  })
}

// 删除
export const closeClubRoomApi = (data) => {
  return service({
    url: '/live/closeClubRoom',
    method: 'post',
    data
  })
}

// 编辑
export const updateClubTableConfigEditApi = (data) => {
  return service({
    url: '/live/clubTableConfigEdit',
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

export const getClubCreateTableListApi = (params) => {
  return service({
    url: '/live/clubCreateTableList',
    method: 'get',
    params
  })
}

// 获取弹幕列表
export const getExpressionList = (params) => {
  return service({
    url: '/live/getExpressionList',
    method: 'get',
    params
  })
}

// 创建弹幕表情配置
export const createExpression = (data) => {
  return service({
    url: '/live/createExpression',
    method: 'post',
    data
  })
}

// 更新弹幕表情配置
export const updateExpression = (data) => {
  return service({
    url: '/live/updateExpression',
    method: 'post',
    data
  })
}

// 删除弹幕
export const deleteExpression = (params) => {
  return service({
    url: '/live/deleteExpression',
    method: 'get',
    params
  })
}

// 踢出房间用户
export const kickOutUsers = (params) => {
  return service({
    url: '/accountsInFo/kickOutUsers',
    method: 'get',
    params
  })
}
