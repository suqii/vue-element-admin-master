import request from '@/utils/request'
// 用户登录
export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}
// 获取用户信息
export function getInfo(user_id) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { user_id }
  })
}
// 重置密码
export function rsetUserP(user_id) {
  return request({
    url: '/vue-element-admin/adminRepassword',
    method: 'post',
    params: { user_id }
  })
}
// 获取所有用户列表
export function userList(query) {
  return request({
    url: '/vue-element-admin/user/userList',
    method: 'get',
    params: query
  })
}
// 获取新增用户列表
export function newUser(query) {
  return request({
    url: '/vue-element-admin/newUser',
    method: 'get',
    params: query
  })
}
// 用户创建
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
// 禁用用户
export function changeStatusDisable(user_id) {
  return request({
    url: '/vue-element-admin/user/changeStatusDisable',
    method: 'post',
    params: { user_id }
  })
}
// 解除禁用
export function changeStatusAble(user_id) {
  return request({
    url: '/vue-element-admin/user/changeStatusAble',
    method: 'post',
    params: { user_id }
  })
}
// 设置用户为管理员
export function adminSet(user_id) {
  return request({
    url: '/vue-element-admin/user/adminSet',
    method: 'post',
    params: { user_id }
  })
}
// 解除用户为管理员
export function adminCancel(user_id) {
  return request({
    url: '/vue-element-admin/user/adminCancel',
    method: 'post',
    params: { user_id }
  })
}
// 修改用户
export function userEdit(user_id, job, path, sex, email) {
  return request({
    url: '/vue-element-admin/user/userEdit',
    method: 'post',
    params: { user_id, job, path, sex, email }
  })
}
// 修改用户头像
export function userHeadEdit(data) {
  return request({
    url: '/vue-element-admin/article/userHeadEdit',
    method: 'post',
    data
  })
}
export function test() {
  return request({
    url: 'https://www.fastmock.site/mock/2d236839718468299edd0df14cbad715/suqiTest01/vue-element-admin/transaction/list',
    method: 'get'
  })
}
// 登出
export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
// 是否开启阿里大于短信功能
export function sendFlag(isUse) {
  return request({
    url: '/user/sendFlag',
    method: 'post',
    params: { isUse }
  })
}
// 获取阿里大于短信控制状态
export function sendStatus() {
  return request({
    url: '/user/sendStatus',
    method: 'get'
  })
}

// oss
export function oss(file) {
  return request({
    url: '/oss',
    method: 'post',
    params: { file }
  })
}
