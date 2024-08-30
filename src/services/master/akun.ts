// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query list GET /api/v1/akuns */
export async function fetchAkun(params: API.PaginationParam, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Akun[]>>('/api/v1/akuns', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Create record POST /api/v1/akuns */
export async function addAkun(body: API.Akun, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Akun>>('/api/v1/akuns', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get record by ID GET /api/v1/akuns/${id} */
export async function getAkun(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Akun>>(`/api/v1/akuns/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update record by ID PUT /api/v1/akuns/${id} */
export async function updateAkun(id: string, body: API.Akun, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/akuns/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete record by ID DELETE /api/v1/akuns/${id} */
export async function delAkun(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/akuns/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
