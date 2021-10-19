import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
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
// 获取所有分类
export function getTopicClassList(query) {
  return request({
    url: '/topicclass',
    method: 'get',
    params: query
  })
}
// 新增分类
export function topicClassAdd(classname, status) {
  return request({
    url: '/vue-element-admin/topic/topicClassAdd',
    method: 'post',
    params: { classname, status }
  })
}
// 编辑分类
export function topicClassEdit(classname, classpic, topic_class_id) {
  return request({
    url: '/vue-element-admin/topic/topicClassEdit',
    method: 'post',
    params: { classname, classpic, topic_class_id }
  })
}
// 删除分类
export function topicClassDelete(topic_class_id) {
  return request({
    url: '/vue-element-admin/topic/topicClassDelete',
    method: 'post',
    params: { topic_class_id }
  })
}
// 获取分类下所有话题
export function getTopicList(query) {
  return request({
    url: '/topicclass/' + query + '/topic/1',
    method: 'get',
    params: query
  })
}
// 新增话题
export function topicAdd(desc, title, titlepic, topic_class_id, type) {
  return request({
    url: '/vue-element-admin/topic/topicAdd',
    method: 'post',
    params: { desc, title, titlepic, topic_class_id, type }
  })
}
// 删除话题
export function topicDelete(topic_id) {
  return request({
    url: '/vue-element-admin/topic/topicDelete',
    method: 'post',
    params: { topic_id }
  })
}
// 编辑话题
export function topicEdit(topic_id, title, titlepic, desc) {
  return request({
    url: '/vue-element-admin/topic/topicEdit',
    method: 'post',
    params: { topic_id, title, titlepic, desc }
  })
}
// 编辑话题
export function getUserPostList(topic_id) {
  return request({
    url: '/user/' + topic_id + '/post/1',
    method: 'get',
    params: { topic_id }
  })
}
// 获取指定文章分类下的文章
export function getPostClassList(topic_id) {
  return request({
    url: '/postclass/' + topic_id + '/post/1',
    method: 'get',
    params: { topic_id }
  })
}
// 轮播图获取
export function getAdsenseList(adsense_id) {
  return request({
    url: '/adsense/' + adsense_id + '',
    method: 'get',
    params: { adsense_id }
  })
}
// 添加轮播图
export function adsenseAdd(type, src) {
  return request({
    url: 'vue-element-admin/adsense/adsenseAdd',
    method: 'post',
    params: { type, src }
  })
}
// 删除轮播图
export function adsenseDelete(adsense_id) {
  return request({
    url: '/vue-element-admin/adsense/adsenseDelete',
    method: 'post',
    params: { adsense_id }
  })
}
// 编辑轮播图
export function adsenseEdit(adsense_id, src) {
  return request({
    url: '/vue-element-admin/adsense/adsenseEdit',
    method: 'post',
    params: { adsense_id, src }
  })
}
// 获取Git日志
export function getGitLog(query) {
  return request({
    url: '/vue-element-admin/getGitLog',
    method: 'get',
    params: query
  })
}
