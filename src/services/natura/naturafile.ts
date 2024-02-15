// @ts-ignore
/* eslint-disable */
import type { SorterResult } from 'antd/es/table/interface';
import { request } from 'umi';

/** Query list GET /api/v1/tamp-file-headers */
export async function fetchTampFileHeader(
  params: API.PaginationParam,
  sorter?: SorterResult<API.TampFileHeader>,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult<API.TampFileHeader[]>>('/api/v1/tamp-file-headers', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
      ...sorter,
    },
    ...(options || {}),
  });
}

/** Create record POST /api/v1/tamp-file-headers */
export async function addTampFileHeader(
  body: API.TampFileHeader,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult<API.TampFileHeader>>('/api/v1/tamp-file-headers', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Upload POST /api/v1/tamp-file-headers */
export async function uploadFileHeader(body: FormData, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.UploadFile>>('/api/v1/tamp-file-headers', {
    method: 'POST',
    requestType: 'form',
    data: body,
    ...(options || {}),
  });
}

/** Get record by ID GET /api/v1/tamp-file-headers/${id} */
export async function getTampFileHeader(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.TampFileHeader>>(`/api/v1/tamp-file-headers/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update record by ID PUT /api/v1/tamp-file-headers/${id} */
export async function updateTampFileHeader(
  id: string,
  body: API.TampFileHeader,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult<any>>(`/api/v1/tamp-file-headers/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete record by ID DELETE /api/v1/tamp-file-headers/${id} */
export async function delTampFileHeader(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/tamp-file-headers/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
