import request from '@/router/axios';

export const add = (row) => {
  console.log(row)
  return request({
    url: '/api/blade-neo4j/addNode',
    method: 'post',
    data: row
  })
}
