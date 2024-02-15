import { PageContainer, ProCard } from '@ant-design/pro-components';
import React from 'react';
import { PageHeader } from 'antd';
import NaturaFormUpload from '../components/NaturaFormUpload';

const NaturaUpload: React.FC = () => {
  return (
    <>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Upload Natura"
        subTitle="Form Natura untuk Upload file"
      />

      <PageContainer ghost>
        <ProCard>
          <NaturaFormUpload />
        </ProCard>
      </PageContainer>
    </>
  );
};

export default NaturaUpload;
