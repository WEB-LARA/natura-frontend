import { PageContainer, ProCard } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { Alert, Button, message, PageHeader, Space } from 'antd';
import NaturaFormUpload from '../components/NaturaFormUpload';
import { DownloadOutlined } from '@ant-design/icons';
import { downloadContoh, downloadContohGL, downloadContohAP } from '@/services/natura/naturafile';

const NaturaUpload: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const downloadTempl = async () => {
    setLoading(true);
    async function downloadContohMe() {
      try {
        await downloadContoh()
          .then((res) => {
            const contentDisposition = res.headers.get('Content-Disposition');
            let fileName = 'contohFile.csv'; // Default file name

            if (contentDisposition) {
              const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
              if (fileNameMatch.length > 1) {
                fileName = fileNameMatch[1];
              }
            }

            return res.blob().then((response) => ({
              blob: response,
              fileName: fileName,
            }));
          })
          .then(({ blob, fileName }) => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
          });

        setLoading(false);
        message.success('Downloaded Template!');
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
          .then((res) => {
            const contentDisposition = res.headers.get('Content-Disposition');
            let fileName = 'contohFileGL.csv'; // Default file name

            if (contentDisposition) {
              const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
              if (fileNameMatch.length > 1) {
                fileName = fileNameMatch[1];
              }
            }

            return res.blob().then((response) => ({
              blob: response,
              fileName: fileName,
            }));
          })
          .then(({ blob, fileName }) => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
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

  const downloadTemplPUM = async () => {
    setLoading(true);
    async function downloadContohPUMMe() {
      try {
        await downloadContohAP()
          .then((res) => {
            const contentDisposition = res.headers.get('Content-Disposition');
            let fileName = 'contohFileAP.csv'; // Default file name

            if (contentDisposition) {
              const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
              if (fileNameMatch.length > 1) {
                fileName = fileNameMatch[1];
              }
            }

            return res.blob().then((response) => ({
              blob: response,
              fileName: fileName,
            }));
          })
          .then(({ blob, fileName }) => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
          });

        setLoading(false);
        message.success('Downloaded AP!');
      } catch (error) {
        setLoading(false);
        message.error('Create Failed.');
      }
    }
    downloadContohPUMMe();
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
          message="Contoh format CSV: ORACLEGL_20240717.csv. Download Templete: untuk upload data baru dari templete, Download Data GL: untuk melengkapi data."
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
              Download Template
            </Button>

            <Button
              className="margin-left: 8px;"
              onClick={downloadTemplGL}
              icon={<DownloadOutlined />}
            >
              Download Data GL tanpa NIK
            </Button>

            <Button
              className="margin-left: 8px;"
              onClick={downloadTemplPUM}
              icon={<DownloadOutlined />}
            >
              Download Template ID Natura (AP)
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
