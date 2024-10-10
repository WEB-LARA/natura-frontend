// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query list GET /api/v1/oracle-aps */
export async function fetchOracleAp(params: API.PaginationParam, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.OracleAp[]>>('/api/v1/oracle-aps', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Create record POST /api/v1/oracle-aps */
export async function addOracleAp(body: API.OracleAp, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.OracleAp>>('/api/v1/oracle-aps', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Validate record POST /api/v1/oracle-aps */
export async function validateOracleAp(options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.OracleAp>>('/api/v1/oracle-aps/validate', {
    method: 'POST',
    ...(options || {}),
  });
}

/** Validate record POST /api/v1/oracle-aps */
export async function proccessOracleAp(options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.OracleAp>>('/api/v1/oracle-aps/proccess', {
    method: 'POST',
    ...(options || {}),
  });
}

/** Get record by ID GET /api/v1/oracle-aps/${id} */
export async function getOracleAp(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.OracleAp>>(`/api/v1/oracle-aps/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update record by ID PUT /api/v1/oracle-aps/${id} */
export async function updateOracleAp(
  id: string,
  body: API.OracleAp,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult<any>>(`/api/v1/oracle-aps/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete record by ID DELETE /api/v1/oracle-aps/${id} */
export async function delOracleAp(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/oracle-aps/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
