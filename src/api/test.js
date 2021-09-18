import request from '@/utils/request'
const baseUrl =
  'https://www.fastmock.site/mock/2d236839718468299edd0df14cbad715/suqiTest01'
  // 新增用户数据
export function newUserList() {
  return request({
    url: baseUrl + '/vue-element-admin/newUserList',
    method: 'get'
  })
}
// 首页折线图数据
export function charData() {
  return request({
    url: baseUrl + '/vue-element-admin/charData',
    method: 'get'
  })
}
// 图表
export function charts() {
  return request({
    url: baseUrl + '/vue-element-admin/charts',
    method: 'get'
  })
}
