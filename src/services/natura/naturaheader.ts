
// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query list GET /api/v1/natura-headers */
export async function fetchNaturaHeader(params: API.PaginationParam, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.NaturaHeader[]>>('/api/v1/natura-headers', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Create record POST /api/v1/natura-headers */
export async function addNaturaHeader(body: API.NaturaHeader, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.NaturaHeader>>('/api/v1/natura-headers', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get record by ID GET /api/v1/natura-headers/${id} */
export async function getNaturaHeader(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.NaturaHeader>>(`/api/v1/natura-headers/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update record by ID PUT /api/v1/natura-headers/${id} */
export async function updateNaturaHeader(id: string, body: API.NaturaHeader, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/natura-headers/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete record by ID DELETE /api/v1/natura-headers/${id} */
export async function delNaturaHeader(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/natura-headers/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
