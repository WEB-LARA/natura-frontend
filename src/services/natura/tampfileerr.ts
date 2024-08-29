
// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query list GET /api/v1/tamp-file-errs */
export async function fetchTampFileErr(params: API.PaginationParam, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.TampFileErr[]>>('/api/v1/tamp-file-errs', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Create record POST /api/v1/tamp-file-errs */
export async function addTampFileErr(body: API.TampFileErr, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.TampFileErr>>('/api/v1/tamp-file-errs', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get record by ID GET /api/v1/tamp-file-errs/${id} */
export async function getTampFileErr(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.TampFileErr>>(`/api/v1/tamp-file-errs/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update record by ID PUT /api/v1/tamp-file-errs/${id} */
export async function updateTampFileErr(id: string, body: API.TampFileErr, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/tamp-file-errs/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete record by ID DELETE /api/v1/tamp-file-errs/${id} */
export async function delTampFileErr(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/tamp-file-errs/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
