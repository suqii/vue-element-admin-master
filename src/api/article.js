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
export function topicClassEdit(classname, topic_class_id) {
  return request({
    url: '/vue-element-admin/topic/topicClassEdit',
    method: 'post',
    params: { classname, topic_class_id }
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
export function topicAdd(topic_id, topic_class_id, type, title, titlepic, desc) {
  return request({
    url: '/vue-element-admin/topic/topicAdd',
    method: 'post',
    params: { topic_id, topic_class_id, type, title, titlepic, desc }
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
export function topicEdit(topic_id) {
  return request({
    url: '/vue-element-admin/topic/topicEdit',
    method: 'post',
    params: { topic_id }
  })
}
