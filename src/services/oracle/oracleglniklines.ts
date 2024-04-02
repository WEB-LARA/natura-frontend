
// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query list GET /api/v1/oracle-gl-nik-lines */
export async function fetchOracleGlNikLine(params: API.PaginationParam, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.OracleGlNikLine[]>>('/api/v1/oracle-gl-nik-lines', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Create record POST /api/v1/oracle-gl-nik-lines */
export async function addOracleGlNikLine(body: API.OracleGlNikLine, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.OracleGlNikLine>>('/api/v1/oracle-gl-nik-lines', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get record by ID GET /api/v1/oracle-gl-nik-lines/${id} */
export async function getOracleGlNikLine(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.OracleGlNikLine>>(`/api/v1/oracle-gl-nik-lines/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update record by ID PUT /api/v1/oracle-gl-nik-lines/${id} */
export async function updateOracleGlNikLine(id: string, body: API.OracleGlNikLine, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/oracle-gl-nik-lines/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete record by ID DELETE /api/v1/oracle-gl-nik-lines/${id} */
export async function delOracleGlNikLine(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/oracle-gl-nik-lines/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
