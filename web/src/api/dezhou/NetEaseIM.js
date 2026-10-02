import service from '@/utils/request'

// 获取网易云信配置列表
export const getNetEaseIMList = (params) => {
  return service({
    url: '/IMServer/ListImCfg',
    method: 'get',
    params
  })
}

// 创建修改网易云信配置
export const createOrUpdateNetEaseIM = (data) => {
  return service({
    url: '/IMServer/ImCfgCreat',
    method: 'post',
    data
  })
}


