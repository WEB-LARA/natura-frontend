// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query list GET /api/v1/sources */
export async function fetchSource(params: API.PaginationParam, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Source[]>>('/api/v1/sources', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Create record POST /api/v1/sources */
export async function addSource(body: API.Source, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Source>>('/api/v1/sources', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get record by ID GET /api/v1/sources/${id} */
export async function getSource(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Source>>(`/api/v1/sources/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update record by ID PUT /api/v1/sources/${id} */
export async function updateSource(id: string, body: API.Source, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/sources/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete record by ID DELETE /api/v1/sources/${id} */
export async function delSource(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/sources/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
