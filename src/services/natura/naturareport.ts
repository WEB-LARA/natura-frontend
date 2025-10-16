// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Create record POST /api/v1/natura-report/lptn */
export async function postLptn(body: API.ReportPerincianForm, options?: { [key: string]: any }) {
  return request('/api/v1/natura-report/lptn', {
    method: 'POST',
    data: body,
    responseType: 'blob',
    parseResponse: false,
    ...(options || {}),
  });
}

/** Create record POST /api/v1/natura-report/lrpn */
export async function postLrpn(body: API.ReportReconForm, options?: { [key: string]: any }) {
  return request('/api/v1/natura-report/lrpn', {
    method: 'POST',
    data: body,
    responseType: 'blob',
    parseResponse: false,
    ...(options || {}),
  });
}

/** Create record POST /api/v1/natura-report/lpnk */
export async function postLpnk(body: API.ReportPenghasilanForm, options?: { [key: string]: any }) {
  return request('/api/v1/natura-report/lpnk', {
    method: 'POST',
    data: body,
    responseType: 'blob',
    parseResponse: false,
    ...(options || {}),
  });
}

/** Create record POST /api/v1/natura-report/dppn */
export async function postDppn(body: API.ReportDPPNForm, options?: { [key: string]: any }) {
  return request('/api/v1/natura-report/dppn', {
    method: 'POST',
    data: body,
    responseType: 'blob',
    parseResponse: false,
    ...(options || {}),
  });
}

/** Create record POST /api/v1/natura-report/dppn */
export async function postLrdr(body: API.ReportDPPNForm, options?: { [key: string]: any }) {
  return request('/api/v1/natura-report/lrdr', {
    method: 'POST',
    data: body,
    responseType: 'blob',  
    skipErrorHandler: true,  // ✅ Tambahkan ini
    getResponse: true,   // ambil binary data
    ...(options || {}),
  });
}


/** Create record POST /api/v1/natura-report/dtpn */
export async function postDtpn(body: API.ReportDPPNForm, options?: { [key: string]: any }) {
  return request('/api/v1/natura-report/dtpn', {
    method: 'POST',
    data: body,
    responseType: 'blob',
    parseResponse: false,
    ...(options || {}),
  });
}

/** Create record POST /api/v1/natura-report/dipn */
export async function postDipn(body: API.ReportDPPNForm, options?: { [key: string]: any }) {
  return request('/api/v1/natura-report/dipn', {
    method: 'POST',
    data: body,
    responseType: 'blob',
    parseResponse: false,
    ...(options || {}),
  });
}
