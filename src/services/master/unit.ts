// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query list GET /api/v1/units */
export async function fetchUnit(params: API.PaginationParam, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Unit[]>>('/api/v1/units', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Create record POST /api/v1/units */
export async function addUnit(body: API.Unit, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Unit>>('/api/v1/units', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get record by ID GET /api/v1/units/${id} */
export async function getUnit(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Unit>>(`/api/v1/units/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update record by ID PUT /api/v1/units/${id} */
export async function updateUnit(id: string, body: API.Unit, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/units/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete record by ID DELETE /api/v1/units/${id} */
export async function delUnit(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/units/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

export const fetchUnitFilter = async (): Promise<API.FilterType> => {
  try {
    const res = await fetchUnit({ status: 'enabled', resultType: 'select', pageSize: 100 });
    const data = res.data;

    const unitFilter: API.FilterType = {};

    if (!data) {
      return unitFilter;
    }
    data.forEach((item: API.Unit) => {
      if (item.name) {
        unitFilter[item.name] = { text: item.name };
      }
    });
    return unitFilter;
  } catch (error) {
    console.error('Error fetching status filter data:', error);
    throw error;
  }
};

export const fetchUnitFilterByID = async (): Promise<API.FilterType> => {
  try {
    const res = await fetchUnit({ status: 'enabled', resultType: 'select', pageSize: 100 });
    const data = res.data;

    const unitFilter: API.FilterType = {};

    if (!data) {
      return unitFilter;
    }
    data.forEach((item: API.Unit) => {
      if (item.name && item.id) {
        unitFilter[item.id] = { text: item.name };
      }
    });
    return unitFilter;
  } catch (error) {
    console.error('Error fetching status filter data:', error);
    throw error;
  }
};

export const fetchUnitFilterByCode = async (): Promise<API.FilterType> => {
  try {
    const res = await fetchUnit({ status: 'enabled', resultType: 'select', pageSize: 100 });
    const data = res.data;

    const unitFilter: API.FilterType = {};

    if (!data) {
      return unitFilter;
    }
    data.forEach((item: API.Unit) => {
      if (item.code && item.name) {
        unitFilter[item.code] = { text: item.name };
      }
    });
    return unitFilter;
  } catch (error) {
    console.error('Error fetching status filter data:', error);
    throw error;
  }
};
