import { PageContainer, ProCard } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { Alert, Button, message, PageHeader, Space } from 'antd';
import NaturaFormUpload from '../components/NaturaFormUpload';
import { DownloadOutlined } from '@ant-design/icons';
import { downloadContoh, downloadContohGL } from '@/services/natura/naturafile';

const NaturaUpload: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const downloadTempl = async () => {
    setLoading(true);
    async function downloadContohMe() {
      try {
        await downloadContoh()
          .then((res) => res.blob())
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'contohFile.csv'); //or any other extension
            document.body.appendChild(link);
            link.click();
          });

        setLoading(false);
        message.success('Downloaded Templete!');
      } catch (error) {
        setLoading(false);
        message.error('Create Failed.');
      }
    }
    downloadContohMe();
  };

  const downloadTemplGL = async () => {
    setLoading(true);
    async function downloadContohGLMe() {
      try {
        await downloadContohGL()
          .then((res) => res.blob())
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'contohFileGL.csv'); //or any other extension
            document.body.appendChild(link);
            link.click();
          });

        setLoading(false);
        message.success('Downloaded GL!');
      } catch (error) {
        setLoading(false);
        message.error('Create Failed.');
      }
    }
    downloadContohGLMe();
  };

  return (
    <>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Upload Natura"
        subTitle="Form Natura untuk Upload file"
      />

      <PageContainer ghost>
        <Alert
          message="contoh format CSV: ORACLEGL_20240717.csv. Upload data yang ingin direvisi saja. Tidak perlu semua data di upload ulang."
          type="info"
          showIcon
        />
        <br />
        <ProCard>
          <Space>
            <Button
              className="margin-right: 8px;"
              loading={loading}
              onClick={downloadTempl}
              icon={<DownloadOutlined />}
            >
              Download Templete
            </Button>

            <Button
              className="margin-left: 8px;"
              onClick={downloadTemplGL}
              icon={<DownloadOutlined />}
            >
              Download Data GL
            </Button>
          </Space>
          <br />
          <br />
          <NaturaFormUpload />
        </ProCard>
      </PageContainer>
    </>
  );
};

export default NaturaUpload;
