
// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query list GET /api/v1/natura-process-lines */
export async function fetchNaturaProcessLine(params: API.PaginationParam, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.NaturaProcessLine[]>>('/api/v1/natura-process-lines', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Create record POST /api/v1/natura-process-lines */
export async function addNaturaProcessLine(body: API.NaturaProcessLine, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.NaturaProcessLine>>('/api/v1/natura-process-lines', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get record by ID GET /api/v1/natura-process-lines/${id} */
export async function getNaturaProcessLine(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.NaturaProcessLine>>(`/api/v1/natura-process-lines/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update record by ID PUT /api/v1/natura-process-lines/${id} */
export async function updateNaturaProcessLine(id: string, body: API.NaturaProcessLine, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/natura-process-lines/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete record by ID DELETE /api/v1/natura-process-lines/${id} */
export async function delNaturaProcessLine(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/natura-process-lines/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
