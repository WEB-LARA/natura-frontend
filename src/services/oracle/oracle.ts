// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Validate record POST /api/v1/oracle-headers/validate-all */
export async function validateAll(options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.OracleReturnProccess>>(
    '/api/v1/oracle-headers/validate-all',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** Validate record POST /api/v1/oracle-headers/proccess-all */
export async function proccessAll(options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.OracleReturnProccess>>(
    '/api/v1/oracle-headers/proccess-all',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** Query list GET /api/v1/oracle-gl-errs */
export async function fetchGlErrLine(
  params?: API.PaginationParam,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult<API.ErrLine[]>>('/api/v1/oracle-gl-errs', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Query list GET /api/v1/oracle-gl-nik-errs */
export async function fetchGlNikErrLine(
  params?: API.PaginationParam,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult<API.ErrLine[]>>('/api/v1/oracle-gl-nik-errs', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Query list GET /api/v1/cars-errs */
export async function fetchCarsErrLine(
  params?: API.PaginationParam,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult<API.ErrLine[]>>('/api/v1/cars-errs', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}
