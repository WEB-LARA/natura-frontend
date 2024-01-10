// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query list GET /api/v1/cabangs */
export async function fetchCabang(params: API.PaginationParam, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Cabang[]>>('/api/v1/cabangs', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Create record POST /api/v1/cabangs */
export async function addCabang(body: API.Cabang, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Cabang>>('/api/v1/cabangs', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get record by ID GET /api/v1/cabangs/${id} */
export async function getCabang(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Cabang>>(`/api/v1/cabangs/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update record by ID PUT /api/v1/cabangs/${id} */
export async function updateCabang(id: string, body: API.Cabang, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/cabangs/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete record by ID DELETE /api/v1/cabangs/${id} */
export async function delCabang(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/cabangs/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
