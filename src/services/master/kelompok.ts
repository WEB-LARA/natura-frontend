// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query list GET /api/v1/kelompoks */
export async function fetchKelompok(params: API.PaginationParam, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Kelompok[]>>('/api/v1/kelompoks', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Create record POST /api/v1/kelompoks */
export async function addKelompok(body: API.Kelompok, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Kelompok>>('/api/v1/kelompoks', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get record by ID GET /api/v1/kelompoks/${id} */
export async function getKelompok(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Kelompok>>(`/api/v1/kelompoks/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update record by ID PUT /api/v1/kelompoks/${id} */
export async function updateKelompok(
  id: string,
  body: API.Kelompok,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult<any>>(`/api/v1/kelompoks/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete record by ID DELETE /api/v1/kelompoks/${id} */
export async function delKelompok(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/kelompoks/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
