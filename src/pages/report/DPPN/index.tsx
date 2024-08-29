import type { ProFormInstance } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProForm } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import { PageHeader, message } from 'antd';
import ReportDPPNForm from './components/ReportDPPNForm';
import { postDppn } from '@/services/natura/naturareport';

const ReportDPPN: React.FC = () => {
  const reportFormRef = useRef<ProFormInstance<API.ReportDPPNForm>>();
  const [loading, setLoading] = useState(false);

  const handleFinish = async () => {
    const report = await reportFormRef.current?.validateFields();
    if (report) {
      setLoading(true);
      async function downloadPdfMe() {
        try {
          await postDppn(report!)
            .then((res) => res.blob())
            .then((response) => {
              const url = window.URL.createObjectURL(new Blob([response]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'DPPN.xlsx'); //or any other extension
              document.body.appendChild(link);
              link.click();
            });

          setLoading(false);
          message.success('downloaded!');
        } catch (error) {
          setLoading(false);
          message.error('create failed.');
        }
      }
      downloadPdfMe();
    }
  };

  return (
    <>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Laporan Daftar Penerima Penghasilan Natura"
        subTitle="Form DPPN Natura untuk generate report"
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
            <ReportDPPNForm formRef={reportFormRef} />
          </ProForm>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default ReportDPPN;
