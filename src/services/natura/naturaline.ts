// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query list GET /api/v1/natura-lines */
export async function fetchNaturaLine(
  params: API.PaginationParam,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult<API.NaturaLine[]>>('/api/v1/natura-lines', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Create record POST /api/v1/natura-lines */
export async function addNaturaLine(body: API.NaturaLine, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.NaturaLine>>('/api/v1/natura-lines', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get record by ID GET /api/v1/natura-lines/${id} */
export async function getNaturaLine(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.NaturaLine>>(`/api/v1/natura-lines/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update record by ID PUT /api/v1/natura-lines/${id} */
export async function updateNaturaLine(
  id: string,
  body: API.NaturaLine,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult<any>>(`/api/v1/natura-lines/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete record by ID DELETE /api/v1/natura-lines/${id} */
export async function delNaturaLine(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/natura-lines/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
