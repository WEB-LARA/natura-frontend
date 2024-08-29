// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query list GET /api/v1/oracle-ap-reversals */
export async function fetchOracleApRev(
  params: API.PaginationParam,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult<API.OracleApRev[]>>('/api/v1/oracle-ap-reversals', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Create record POST /api/v1/oracle-ap-reversals */
export async function addOracleApRev(body: API.OracleApRev, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.OracleApRev>>('/api/v1/oracle-ap-reversals', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Validate record POST /api/v1/oracle-ap-reversals */
export async function validateOracleApRev(options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.OracleApRev>>('/api/v1/oracle-ap-reversals/validate', {
    method: 'POST',
    ...(options || {}),
  });
}

/** Validate record POST /api/v1/oracle-ap-reversals */
export async function proccessOracleApRev(options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.OracleApRev>>('/api/v1/oracle-ap-reversals/proccess', {
    method: 'POST',
    ...(options || {}),
  });
}

/** Get record by ID GET /api/v1/oracle-ap-reversals/${id} */
export async function getOracleApRev(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.OracleApRev>>(`/api/v1/oracle-ap-reversals/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update record by ID PUT /api/v1/oracle-ap-reversals/${id} */
export async function updateOracleApRev(
  id: string,
  body: API.OracleApRev,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult<any>>(`/api/v1/oracle-ap-reversals/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete record by ID DELETE /api/v1/oracle-ap-reversals/${id} */
export async function delOracleApRev(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/oracle-ap-reversals/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
