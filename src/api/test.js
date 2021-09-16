import request from '@/utils/request'
const baseUrl =
  'https://www.fastmock.site/mock/2d236839718468299edd0df14cbad715/suqiTest01'
export function newUserList() {
  return request({
    url: baseUrl + '/vue-element-admin/newUserList',
    method: 'get'
  })
}
