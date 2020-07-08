import request from '@/router/axios';

export const add = (row) => {
  return request({
    url: '/api/blade-neo4j/addNode',
    method: 'post',
    data: row
  })
}

export const addRelation = (row) => {
  console.log(row)
  return request({
    url: '/api/blade-neo4j/addRelation',
    method: 'post',
    data: row
  })
}

