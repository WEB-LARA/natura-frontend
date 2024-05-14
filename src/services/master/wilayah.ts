// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query list GET /api/v1/wilayahs */
export async function fetchWilayah(params: API.PaginationParam, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Wilayah[]>>('/api/v1/wilayahs', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Create record POST /api/v1/wilayahs */
export async function addWilayah(body: API.Wilayah, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Wilayah>>('/api/v1/wilayahs', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get record by ID GET /api/v1/wilayahs/${id} */
export async function getWilayah(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Wilayah>>(`/api/v1/wilayahs/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update record by ID PUT /api/v1/wilayahs/${id} */
export async function updateWilayah(
  id: string,
  body: API.Wilayah,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult<any>>(`/api/v1/wilayahs/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete record by ID DELETE /api/v1/wilayahs/${id} */
export async function delWilayah(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/wilayahs/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** Create record POST /api/v1/sync-wilayah */
export async function syncWilayah(options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Wilayah>>('/api/v1/sync-wilayah', {
    method: 'POST',
    ...(options || {}),
  });
}
