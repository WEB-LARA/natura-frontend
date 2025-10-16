// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query list GET /api/v1/oracle-gl-niks */
export async function fetchOracleGlNik(
  params: API.PaginationParam,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult<API.OracleGlNik[]>>('/api/v1/oracle-gl-niks', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Create record POST /api/v1/oracle-gl-niks */
export async function addOracleGlNik(body: API.OracleGlNik, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.OracleGlNik>>('/api/v1/oracle-gl-niks', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get record by ID GET /api/v1/oracle-gl-niks/${id} */
export async function getOracleGlNik(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.OracleGlNik>>(`/api/v1/oracle-gl-niks/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update record by ID PUT /api/v1/oracle-gl-niks/${id} */
export async function updateOracleGlNik(
  id: string,
  body: API.OracleGlNik,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult<any>>(`/api/v1/oracle-gl-niks/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete record by ID DELETE /api/v1/oracle-gl-niks/${id} */
export async function delOracleGlNik(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/oracle-gl-niks/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
