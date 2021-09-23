import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo(user_id) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { user_id }
  })
}

export function test() {
  return request({
    url: 'https://www.fastmock.site/mock/2d236839718468299edd0df14cbad715/suqiTest01/vue-element-admin/transaction/list',
    method: 'get'
  })
}
export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
