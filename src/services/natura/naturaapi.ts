// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query list GET /api/v1/cars-api-headers */
export async function fetchCarsApiHeader(
  params: API.PaginationParam,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult<API.CarsHeader[]>>('/api/v1/cars-headers', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Create record POST /api/v1/cars-api-headers */
export async function addCarsApiHeader(body: API.CarsHeader, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.CarsHeader>>('/api/v1/car-headers', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get record by ID GET /api/v1/cars-api-headers/${id} */
export async function getCarsApiHeader(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.CarsHeader>>(`/api/v1/car-headers/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update record by ID PUT /api/v1/cars-api-headers/${id} */
export async function updateCarsApiHeader(
  id: string,
  body: API.CarsHeader,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult<any>>(`/api/v1/car-headers/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete record by ID DELETE /api/v1/cars-api-headers/${id} */
export async function delCarsApiHeader(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/car-headers/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** Query list GET /api/v1/cars-lines */
export async function fetchCarsApiLine(
  params: API.PaginationParam,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult<API.CarsLine[]>>('/api/v1/cars-lines', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}
