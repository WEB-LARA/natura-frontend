
// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query list GET /api/v1/oracle-gls */
export async function fetchOracleGl(params: API.PaginationParam, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.OracleGl[]>>('/api/v1/oracle-gls', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Create record POST /api/v1/oracle-gls */
export async function addOracleGl(body: API.OracleGl, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.OracleGl>>('/api/v1/oracle-gls', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get record by ID GET /api/v1/oracle-gls/${id} */
export async function getOracleGl(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.OracleGl>>(`/api/v1/oracle-gls/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update record by ID PUT /api/v1/oracle-gls/${id} */
export async function updateOracleGl(id: string, body: API.OracleGl, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/oracle-gls/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete record by ID DELETE /api/v1/oracle-gls/${id} */
export async function delOracleGl(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/oracle-gls/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
