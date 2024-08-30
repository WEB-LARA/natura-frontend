import React from 'react';
import type { UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import { Auth } from '@/utils';

const { Dragger } = Upload;

const NaturaFormUploadManual: React.FC = () => {
  const apiUrl = '/api/v1/tamp-file-headers';
  const token = Auth.getToken();

  const headersUpload = {
    Accept: 'application/json',
    Authorization: `${Auth.getTokenType()} ${token}`,
  };

  const propsUpload: UploadProps = {
    name: 'file',
    accept: '.csv',
    multiple: true,
    action: apiUrl,
    headers: headersUpload,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} ${info.file.response.message}`);
      }
    },
  };

  return (
    <Dragger {...propsUpload}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
        band files
      </p>
    </Dragger>
  );
};

export default NaturaFormUploadManual;
