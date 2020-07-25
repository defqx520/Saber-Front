import request from '@/router/axios';


export const getTaskInfo = (taskId, type) => {
  return request({
    url: '/api/task/show/detail',
    method: 'get',
    params: {
      taskId,type
    }
  })
}

export const downloadFile = () => {
  return request({
    url: '/api/download',
    method: 'get',
    resultType: 'blob'
  })
}

export const fetchTableData = (tableName,attachId,currentPage) => {
  return request({
    url: '/api/task/show/fileData',
    method: 'get',
    params: {
      tableName,attachId,currentPage
    }
  })
}

export const fetchTableColumn = (tableName) => {
  return request({
    url: '/api/task/show/getColumn',
    method: 'get',
    params: {
      tableName
    }
  })
}
