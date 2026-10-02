import service from '@/utils/request'
// @Tags PaiJuWinLoseRecord
// @Summary 创建PaiJuWinLoseRecord表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.PaiJuWinLoseRecord true "创建PaiJuWinLoseRecord表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /paiJuWinLoseRecord/createPaiJuWinLoseRecord [post]
export const createPaiJuWinLoseRecord = (data) => {
  return service({
    url: '/paiJuWinLoseRecord/createPaiJuWinLoseRecord',
    method: 'post',
    data
  })
}

// @Tags PaiJuWinLoseRecord
// @Summary 删除PaiJuWinLoseRecord表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.PaiJuWinLoseRecord true "删除PaiJuWinLoseRecord表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /paiJuWinLoseRecord/deletePaiJuWinLoseRecord [delete]
export const deletePaiJuWinLoseRecord = (params) => {
  return service({
    url: '/paiJuWinLoseRecord/deletePaiJuWinLoseRecord',
    method: 'delete',
    params
  })
}

// @Tags PaiJuWinLoseRecord
// @Summary 批量删除PaiJuWinLoseRecord表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除PaiJuWinLoseRecord表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /paiJuWinLoseRecord/deletePaiJuWinLoseRecord [delete]
export const deletePaiJuWinLoseRecordByIds = (params) => {
  return service({
    url: '/paiJuWinLoseRecord/deletePaiJuWinLoseRecordByIds',
    method: 'delete',
    params
  })
}

// @Tags PaiJuWinLoseRecord
// @Summary 更新PaiJuWinLoseRecord表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.PaiJuWinLoseRecord true "更新PaiJuWinLoseRecord表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /paiJuWinLoseRecord/updatePaiJuWinLoseRecord [put]
export const updatePaiJuWinLoseRecord = (data) => {
  return service({
    url: '/paiJuWinLoseRecord/updatePaiJuWinLoseRecord',
    method: 'put',
    data
  })
}

// @Tags PaiJuWinLoseRecord
// @Summary 用id查询PaiJuWinLoseRecord表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.PaiJuWinLoseRecord true "用id查询PaiJuWinLoseRecord表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /paiJuWinLoseRecord/findPaiJuWinLoseRecord [get]
export const findPaiJuWinLoseRecord = (params) => {
  return service({
    url: '/paiJuWinLoseRecord/findPaiJuWinLoseRecord',
    method: 'get',
    params
  })
}

// @Tags PaiJuWinLoseRecord
// @Summary 分页获取PaiJuWinLoseRecord表列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取PaiJuWinLoseRecord表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /paiJuWinLoseRecord/getPaiJuWinLoseRecordList [get]
export const getPaiJuWinLoseRecordList = (params) => {
  return service({
    url: '/paiJuWinLoseRecord/getPaiJuWinLoseRecordList',
    method: 'get',
    params
  })
}

// @Tags PaiJuWinLoseRecord
// @Summary 不需要鉴权的PaiJuWinLoseRecord表接口
// @Accept application/json
// @Produce application/json
// @Param data query dezhouReq.PaiJuWinLoseRecordSearch true "分页获取PaiJuWinLoseRecord表列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /paiJuWinLoseRecord/getPaiJuWinLoseRecordPublic [get]
export const getPaiJuWinLoseRecordPublic = () => {
  return service({
    url: '/paiJuWinLoseRecord/getPaiJuWinLoseRecordPublic',
    method: 'get',
  })
}
export const getPaiJuRecordList = (params) => {
  return service({
    url: '/paiJuWinLoseRecord/getPaiJuRecordList',
    method: 'get',
    params,
  })
}

// @Tags PaiJuWinLoseRecord
// @Summary 导出PaiJuWinLoseRecord表列表
// @Accept application/json
// @Produce application/json
// @Param data query  "勾选导出PaiJuWinLoseRecord表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"导出成功"}"
// @Router /paiJuWinLoseRecord/getPaiJuRecordReport [get]
export const exportPaiJuWinLoseRecord = (params) => {
  return service({
    url: '/paiJuWinLoseRecord/getPaiJuRecordReport',
    method: 'get',
    params,
  })
}