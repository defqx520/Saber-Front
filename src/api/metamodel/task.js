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
