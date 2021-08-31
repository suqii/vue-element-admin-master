import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}
export function userList(query) {
  return request({
    url: '/vue-element-admin/user/userList',
    method: 'get',
    params: query
  })
}
export function userCreate(query) {
  return request({
    url: '/vue-element-admin/user/userCreate',
    method: 'get',
    params: query
  })
}
// 获取用户信息
export function getuserinfo(user_id) {
  return request({
    url: '/getuserinfo',
    method: 'post',
    params: { user_id }
  })
}
// 删除用户
export function userDelete(user_id) {
  return request({
    url: '/vue-element-admin/user/userDelete',
    method: 'post',
    params: { user_id }
  })
}
export function aa(query) {
  return request({
    url: '/api/user',
    method: 'get',
    params: query,
    baseURL: 'https://www.fastmock.site/mock/2d236839718468299edd0df14cbad715/suqiTest01' // 直接通过覆盖的方式
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
