import React from 'react';
import { ProForm, ProFormUploadDragger } from '@ant-design/pro-components';
import { Auth } from '@/utils';

const NaturaFormUpload: React.FC = () => {
  const token = Auth.getToken();

  const headersUpload = {
    Accept: 'application/json',
    Authorization: `${Auth.getTokenType()} ${token}`,
  };

  return (
    <ProForm layout="vertical" grid={true} submitter={false}>
      <ProFormUploadDragger
        label="Upload"
        name="file_upload"
        action="/api/v1/tamp-file-headers"
        fieldProps={{
          headers: headersUpload,
        }}
        description="Support for a single or bulk upload. Only Support CSV File and Maximum 25 MB"
        title="Click or drag file to this area to upload"
        accept=".csv"
      />
    </ProForm>
  );
};

export default NaturaFormUpload;
