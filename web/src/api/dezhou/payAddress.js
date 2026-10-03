import service from '@/utils/request'

export const getPayAddressListApi = (params) => {
  return service({
    url: '/payAddress/getPayAddressList',
    method: 'get',
    params
  })
}

export const getPayAddressStatsApi = () => {
  return service({
    url: '/payAddress/getPayAddressStats',
    method: 'get'
  })
}

export const findPayAddressApi = (params) => {
  return service({
    url: '/payAddress/findPayAddress',
    method: 'get',
    params
  })
}

export const createPayAddressApi = (data) => {
  return service({
    url: '/payAddress/createPayAddress',
    method: 'post',
    data
  })
}

export const deletePayAddressApi = (data) => {
  return service({
    url: '/payAddress/deletePayAddress',
    method: 'delete',
    data
  })
}

export const deletePayAddressByIdsApi = (data) => {
  return service({
    url: '/payAddress/deletePayAddressByIds',
    method: 'delete',
    data
  })
}

export const updatePayAddressApi = (data) => {
  return service({
    url: '/payAddress/updatePayAddress',
    method: 'put',
    data
  })
}

export const releasePayAddressApi = (data) => {
  return service({
    url: '/payAddress/releasePayAddress',
    method: 'post',
    data
  })
}

export const getPayAddressConfigApi = () => {
  return service({
    url: '/payAddress/getPayAddressConfig',
    method: 'get'
  })
}

export const updatePayAddressConfigApi = (data) => {
  return service({
    url: '/payAddress/updatePayAddressConfig',
    method: 'put',
    data
  })
}

export const verifyPayAddressPoolApi = () => {
  return service({
    url: '/payAddress/verifyPayAddressPool',
    method: 'post'
  })
}
