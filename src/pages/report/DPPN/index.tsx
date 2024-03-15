import type { ProFormInstance } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProForm } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import { PageHeader, message } from 'antd';
import ReportDPPNForm from './components/ReportDPPNForm';

const ReportDPPN: React.FC = () => {
  const naturaFormRef = useRef<ProFormInstance<API.NaturaHeader>>();

  const handleFinish = async () => {
    const natura = await naturaFormRef.current?.validateFields();
    if (natura) {
      delete natura.statusChecked;
      // await addNaturaHeader(natura);

      message.success('Generate successfully');
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
        <ProCard>
          <ProForm<API.NaturaHeader>
            onFinish={async () => {
              try {
                await handleFinish();
              } catch {
                message.error('Failed to save');
              }
            }}
          >
            <ReportDPPNForm formRef={naturaFormRef} />
          </ProForm>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default ReportDPPN;
