import type { ProFormInstance } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProForm } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import { PageHeader, message } from 'antd';
import ReportLRDRForm from './components/ReportLRDRForm';
import { postLrdr } from '@/services/natura/naturareport';

const ReportLRDR: React.FC = () => {
  const reportFormRef = useRef<ProFormInstance<API.ReportDPPNForm>>();
  const [loading, setLoading] = useState(false);

 const handleFinish = async () => {
  try {
    const report = await reportFormRef.current?.validateFields();
    if (!report) return;

  const formatDate = (date: any) => {
  try {
    // pastikan moment/dayjs format ISO (RFC3339)
    return date.toISOString(); // hasil: 2025-10-01T00:00:00.000Z
  } catch {
    return date;
  }
};


    const payload = {
      akun_id: report.akun_id || '',
      cabang_id: report.cabang_id || '',
      kelompok_id: report.kelompok_id || '',
      objek_pajak: report.objek_pajak || 'ALL',
      unit_id: report.unit_id || '',
      status:  '',
      period: report.period?.[0] ? formatDate(report.period[0]) : '',
      end_period: report.period?.[1] ? formatDate(report.period[1]) : '',
      transaction_date: report.period 
        ? [
            report.period[0] ? formatDate(report.period[0]) : '',
            report.period[1] ? formatDate(report.period[1]) : ''
          ].filter(d => d)
        : [],
    };

    console.log('Payload dikirim ke API:', payload);
    setLoading(true);

    // ✅ Karena getResponse: true, response berbentuk { data, response }
    const result = await postLrdr(payload);

    // ambil blob dan nama file dari header
    const blob = result.data;
    const disposition = result.response.headers.get('content-disposition');

    let filename = 'Laporan_LRDR.xlsx';
    if (disposition && disposition.includes('filename=')) {
      filename = disposition.split('filename=')[1].replace(/"/g, '');
    }

    // buat dan trigger download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    message.success('Download berhasil!');
  } catch (error: any) {
    console.error('Error detail:', error);
    
    // ✅ Cek apakah error dari blob yang isinya JSON error
    if (error?.data instanceof Blob) {
      const text = await error.data.text();
      try {
        const errJson = JSON.parse(text);
        message.error(errJson.message || 'Gagal membuat laporan');
      } catch {
        message.error('Gagal membuat laporan: ' + text);
      }
    } else {
      message.error(error?.message || 'Gagal membuat laporan');
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Laporan Rekap Data Reversal"
        subTitle="Form LRDR Natura untuk generate report"
      />
      <PageContainer ghost>
        <ProCard loading={loading}>
          <ProForm<API.NaturaHeader>
            onFinish={async () => {
              try {
                await handleFinish();
              } catch {
                message.error('Failed to save');
              }
            }}
          >
            <ReportLRDRForm formRef={reportFormRef} />
          </ProForm>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default ReportLRDR;