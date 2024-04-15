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
