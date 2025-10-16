// @ts-ignore
/* eslint-disable */
import { SorterResult } from 'antd/es/table/interface';
import { request } from 'umi';

/** Query list GET /api/v1/natura-process-batches */
export async function fetchNaturaProcessBatch(
  params: API.PaginationParam,
  sorter?: SorterResult<API.NaturaProcessBatch>,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult<API.NaturaProcessBatch[]>>('/api/v1/natura-process-batches', {
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

/** Create record POST /api/v1/natura-process-batches */
export async function addNaturaProcessBatch(
  body: API.NaturaProcessBatch,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult<API.NaturaProcessBatch>>('/api/v1/natura-process-batches', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get record by ID GET /api/v1/natura-process-batches/${id} */
export async function getNaturaProcessBatch(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.NaturaProcessBatch>>(
    `/api/v1/natura-process-batches/${id}`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

export async function postProcessReversal(year: number) {
  return request('/api/v1/process-reversal', {
    method: 'POST',
    data: { year },
  });
}

/** Update record by ID PUT /api/v1/natura-process-batches/${id} */
export async function updateNaturaProcessBatch(
  id: string,
  body: API.NaturaProcessBatch,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult<any>>(`/api/v1/natura-process-batches/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete record by ID DELETE /api/v1/natura-process-batches/${id} */
export async function delNaturaProcessBatch(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/natura-process-batches/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
