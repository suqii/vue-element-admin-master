import request from '@/utils/request'

export function searchUser(name) {
  return request({
    url: '/vue-element-admin/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return request({
    url: '/vue-element-admin/transaction/list',
    method: 'get',
    params: query
  })
}

export function test() {
  return request({
    url: 'https://www.fastmock.site/mock/2d236839718468299edd0df14cbad715/suqiTest01/vue-element-admin/transaction/list',
    method: 'get'
  })
}
