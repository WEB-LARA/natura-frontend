// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query list GET /api/v1/niks */
export async function fetchNik(params: API.PaginationParam, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Nik[]>>('/api/v1/niks', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Create record POST /api/v1/niks */
export async function addNik(body: API.Nik, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Nik>>('/api/v1/niks', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get record by ID GET /api/v1/niks/${id} */
export async function getNik(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Nik>>(`/api/v1/niks/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update record by ID PUT /api/v1/niks/${id} */
export async function updateNik(id: string, body: API.Nik, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/niks/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete record by ID DELETE /api/v1/niks/${id} */
export async function delNik(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/niks/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
