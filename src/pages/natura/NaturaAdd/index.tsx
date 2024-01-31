import type { ProFormInstance } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProForm } from '@ant-design/pro-components';
import React, { useRef, useState, useEffect } from 'react';

import NaturaForm from '../Natura/components/NaturaForm';
import NaturaLinesForm from '../Natura/components/NaturaLinesForm';
import {
  addNaturaHeader,
  getNaturaHeader,
  updateNaturaHeader,
} from '@/services/natura/naturaheader';
import { PageHeader, message } from 'antd';
import { useParams } from 'umi';

const NaturaAdd: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState<string>('Add Natura');
  const naturaFormRef = useRef<ProFormInstance<API.NaturaHeader>>();
  const detailsFormRef = useRef<ProFormInstance<API.NaturaHeader>>();
  const [formData, setFormData] = useState<API.NaturaHeader>({});

  useEffect(() => {
    naturaFormRef.current?.resetFields();
    detailsFormRef.current?.resetFields();

    if (id) {
      setTitle('Edit Natura');
      getNaturaHeader(id).then(async (res) => {
        if (res.data) {
          const data = res.data;

          naturaFormRef.current?.setFieldsValue(data);
          detailsFormRef.current?.setFieldsValue(data);
          setFormData(data);
        }
      });
    }
  }, [id]);

  const handleFinish = async () => {
    const natura = await naturaFormRef.current?.validateFields();
    if (natura) {
      delete natura.statusChecked;

      const naturadetails = await detailsFormRef.current?.validateFields();
      if (naturadetails) {
        natura.details = naturadetails?.details;
      }

      if (id) {
        delete formData.details;
        await updateNaturaHeader(id, { ...formData, ...natura });
      } else {
        await addNaturaHeader(natura);
      }
      message.success('Save successfully');
    }
  };

  return (
    <>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={title}
        subTitle="Form Natura untuk isi manual"
      />

      <PageContainer ghost>
        <ProCard>
        <Tabs
        tabPosition="top"
        defaultActiveKey="naturaTab"
        style={{ background: '#fff', paddingTop: 25, paddingBottom: 50 }}
      >
          <ProForm<API.NaturaHeader>
            onFinish={async () => {
              try {
                await handleFinish();
              } catch {
                message.error('Failed to save');
              }
            }}
          >
            <NaturaForm formRef={naturaFormRef} typeDisabled={id ? true : false} />
            <NaturaLinesForm formRef={detailsFormRef} />
          </ProForm>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default NaturaAdd;
