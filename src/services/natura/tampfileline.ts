
// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query list GET /api/v1/tamp-file-lines */
export async function fetchTampFileLine(params: API.PaginationParam, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.TampFileLine[]>>('/api/v1/tamp-file-lines', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Create record POST /api/v1/tamp-file-lines */
export async function addTampFileLine(body: API.TampFileLine, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.TampFileLine>>('/api/v1/tamp-file-lines', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get record by ID GET /api/v1/tamp-file-lines/${id} */
export async function getTampFileLine(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.TampFileLine>>(`/api/v1/tamp-file-lines/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update record by ID PUT /api/v1/tamp-file-lines/${id} */
export async function updateTampFileLine(id: string, body: API.TampFileLine, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/tamp-file-lines/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete record by ID DELETE /api/v1/tamp-file-lines/${id} */
export async function delTampFileLine(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/tamp-file-lines/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
