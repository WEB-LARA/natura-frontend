
// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query list GET /api/v1/natura-process-headers */
export async function fetchNaturaProcessHeader(params: API.PaginationParam, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.NaturaProcessHeader[]>>('/api/v1/natura-process-headers', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Create record POST /api/v1/natura-process-headers */
export async function addNaturaProcessHeader(body: API.NaturaProcessHeader, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.NaturaProcessHeader>>('/api/v1/natura-process-headers', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get record by ID GET /api/v1/natura-process-headers/${id} */
export async function getNaturaProcessHeader(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.NaturaProcessHeader>>(`/api/v1/natura-process-headers/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update record by ID PUT /api/v1/natura-process-headers/${id} */
export async function updateNaturaProcessHeader(id: string, body: API.NaturaProcessHeader, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/natura-process-headers/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete record by ID DELETE /api/v1/natura-process-headers/${id} */
export async function delNaturaProcessHeader(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/natura-process-headers/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
