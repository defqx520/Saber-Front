import request from '@/router/axios';

export const add = (row) => {
  return request({
    url: '/api/blade-neo4j/addNode',
    method: 'post',
    data: row
  })
}

export const addRelation = (row) => {
  return request({
    url: '/api/blade-neo4j/addRelation',
    method: 'post',
    data: row
  })
}

export const loadNetworkData = () => {
  return request({
    url: '/api/blade-neo4j/loadNetworkData',
    method: 'get',
    async: false
  })
}

export const getNodeById = (nodeId) => {
  return request({
    url: '/api/blade-neo4j/getNodeById',
    method: 'get',
    params: {
      nodeId,
    }
  })
}


