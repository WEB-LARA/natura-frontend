// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query list GET /api/v1/cabangs */
export async function fetchCabang(params: API.PaginationParam, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Cabang[]>>('/api/v1/cabangs', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Create record POST /api/v1/cabangs */
export async function addCabang(body: API.Cabang, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Cabang>>('/api/v1/cabangs', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get record by ID GET /api/v1/cabangs/${id} */
export async function getCabang(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Cabang>>(`/api/v1/cabangs/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update record by ID PUT /api/v1/cabangs/${id} */
export async function updateCabang(id: string, body: API.Cabang, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/cabangs/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete record by ID DELETE /api/v1/cabangs/${id} */
export async function delCabang(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/cabangs/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

export const fetchCabangFilter = async (): Promise<API.FilterType> => {
  try {
    const res = await fetchCabang({ status: 'enabled', resultType: 'select', pageSize: 100 });
    const data = res.data;

    const cabangFilter: API.FilterType = {};

    if (!data) {
      return cabangFilter;
    }
    data.forEach((item: API.Cabang) => {
      if (item.name) {
        cabangFilter[item.name] = { text: item.name };
      }
    });
    return cabangFilter;
  } catch (error) {
    console.error('Error fetching status filter data:', error);
    throw error;
  }
};

export const fetchCabangFilterByID = async (): Promise<API.FilterType> => {
  try {
    const res = await fetchCabang({ status: 'enabled', resultType: 'select', pageSize: 100 });
    const data = res.data;

    const cabangFilter: API.FilterType = {};

    if (!data) {
      return cabangFilter;
    }
    data.forEach((item: API.Cabang) => {
      if (item.name && item.id) {
        cabangFilter[item.id] = { text: item.name };
      }
    });
    return cabangFilter;
  } catch (error) {
    console.error('Error fetching status filter data:', error);
    throw error;
  }
};

export const fetchCabangFilterByCode = async (): Promise<API.FilterType> => {
  try {
    const res = await fetchCabang({ status: 'enabled', resultType: 'select', pageSize: 100 });
    const data = res.data;

    const cabangFilter: API.FilterType = {};

    if (!data) {
      return cabangFilter;
    }
    data.forEach((item: API.Cabang) => {
      if (item.id && item.code) {
        cabangFilter[item.id] = { text: item.code };
      }
    });
    return cabangFilter;
  } catch (error) {
    console.error('Error fetching status filter data:', error);
    throw error;
  }
};
