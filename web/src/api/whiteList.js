import service from '@/utils/request'

/* 获取白名单列表
@Param data {path string} true "获取白名单列表"
*/
export const getWhiteList = (params) => { 
    return service({
        url: '/accountsInFo/getWhiteUserList',
        method: 'get',
        params
    })
}
/* 添加白名单
@Param data {path string} true "添加白名单" */
export const addWhiteList = (params) => { 
    return service({
        url: '/accountsInFo/addWhiteUser',
        method: 'get',
        params
    })
}

/* 删除白名单
@Param data {path string} true "删除白名单"
 */
export const deleteWhiteList = (params) => {
    return service({
        url: '/accountsInFo/deleteWhiteUser',
        method: 'delete',
        params
    })
}