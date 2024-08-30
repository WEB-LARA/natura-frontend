
// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query list GET /api/v1/oracle-gl-lines */
export async function fetchOracleGlLine(params: API.PaginationParam, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.OracleGlLine[]>>('/api/v1/oracle-gl-lines', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Create record POST /api/v1/oracle-gl-lines */
export async function addOracleGlLine(body: API.OracleGlLine, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.OracleGlLine>>('/api/v1/oracle-gl-lines', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get record by ID GET /api/v1/oracle-gl-lines/${id} */
export async function getOracleGlLine(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.OracleGlLine>>(`/api/v1/oracle-gl-lines/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update record by ID PUT /api/v1/oracle-gl-lines/${id} */
export async function updateOracleGlLine(id: string, body: API.OracleGlLine, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/oracle-gl-lines/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete record by ID DELETE /api/v1/oracle-gl-lines/${id} */
export async function delOracleGlLine(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/oracle-gl-lines/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
