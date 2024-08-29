// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query list GET /api/v1/oracle-gl-reversals */
export async function fetchOracleGlRev(
  params: API.PaginationParam,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult<API.OracleGlRev[]>>('/api/v1/oracle-gl-reversals', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Create record POST /api/v1/oracle-gl-reversals */
export async function addOracleGlRev(body: API.OracleGlRev, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.OracleGlRev>>('/api/v1/oracle-gl-reversals', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get record by ID GET /api/v1/oracle-gl-reversals/${id} */
export async function getOracleGlRev(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.OracleGlRev>>(`/api/v1/oracle-gl-reversals/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update record by ID PUT /api/v1/oracle-gl-reversals/${id} */
export async function updateOracleGlRev(
  id: string,
  body: API.OracleGlRev,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult<any>>(`/api/v1/oracle-gl-reversals/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete record by ID DELETE /api/v1/oracle-gl-reversals/${id} */
export async function delOracleGlRev(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/oracle-gl-reversals/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
