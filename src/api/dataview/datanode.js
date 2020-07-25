import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/bdc-data/datanode/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/bdc-data/datanode/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/bdc-data/datanode/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const share = (ids) => {
  return request({
    url: '/api/bdc-data/datanode/share',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/bdc-data/datanode/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/bdc-data/datanode/submit',
    method: 'post',
    data: row
  })
}

