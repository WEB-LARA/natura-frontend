import type { ProFormInstance } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProForm } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import { PageHeader, message } from 'antd';
import { useParams } from 'umi';
import ReportPerincianForm from './components/ReportPerincianForm';

const ReportPerincian: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const naturaFormRef = useRef<ProFormInstance<API.NaturaHeader>>();

  const handleFinish = async () => {
    const natura = await naturaFormRef.current?.validateFields();
    if (natura) {
      delete natura.statusChecked;

      //await addNaturaHeader(natura);
      message.success('Generate successfully');
    }
  };

  return (
    <>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Laporan Perincian Natura"
        subTitle="Form Perincian Natura untuk generate report"
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
            <ReportPerincianForm
              formRef={naturaFormRef}
              typeDisabled={id ? true : false}
              typePUM={true}
            />
          </ProForm>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default ReportPerincian;
