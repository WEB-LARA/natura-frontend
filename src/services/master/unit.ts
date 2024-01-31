// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query list GET /api/v1/units */
export async function fetchUnit(params: API.PaginationParam, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Unit[]>>('/api/v1/units', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Create record POST /api/v1/units */
export async function addUnit(body: API.Unit, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Unit>>('/api/v1/units', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get record by ID GET /api/v1/units/${id} */
export async function getUnit(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Unit>>(`/api/v1/units/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update record by ID PUT /api/v1/units/${id} */
export async function updateUnit(id: string, body: API.Unit, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/units/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete record by ID DELETE /api/v1/units/${id} */
export async function delUnit(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/units/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
