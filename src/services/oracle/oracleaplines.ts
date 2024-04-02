// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query list GET /api/v1/oracle-ap-lines */
export async function fetchOracleApLine(
  params: API.PaginationParam,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult<API.OracleApLine[]>>('/api/v1/oracle-ap-lines', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Create record POST /api/v1/oracle-ap-lines */
export async function addOracleApLine(body: API.OracleApLine, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.OracleApLine>>('/api/v1/oracle-ap-lines', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get record by ID GET /api/v1/oracle-ap-lines/${id} */
export async function getOracleApLine(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.OracleApLine>>(`/api/v1/oracle-ap-lines/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update record by ID PUT /api/v1/oracle-ap-lines/${id} */
export async function updateOracleApLine(
  id: string,
  body: API.OracleApLine,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult<any>>(`/api/v1/oracle-ap-lines/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete record by ID DELETE /api/v1/oracle-ap-lines/${id} */
export async function delOracleApLine(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/oracle-ap-lines/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
