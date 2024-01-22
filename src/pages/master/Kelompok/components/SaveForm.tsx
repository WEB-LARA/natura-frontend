import React, { useEffect, useRef } from 'react';
import { message } from 'antd';
import { ModalForm, ProFormSwitch, ProFormText } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { addKelompok, getKelompok, updateKelompok } from '@/services/master/kelompok';

type KelompokModalProps = {
  onSuccess: () => void;
  onCancel: () => void;
  visible: boolean;
  title: string;
  id?: string;
};

const KelompokModal: React.FC<KelompokModalProps> = (props: KelompokModalProps) => {
  const formRef = useRef<ProFormInstance<API.Kelompok>>();

  useEffect(() => {
    if (!props.visible) {
      return;
    }

    formRef.current?.resetFields();
    if (props.id) {
      getKelompok(props.id).then(async (res) => {
        if (res.data) {
          const data = res.data;
          formRef.current?.setFieldsValue(data);
        }
      });
    }
  }, [props]);

  return (
    <ModalForm<API.Kelompok>
      visible={props.visible}
      title={props.title}
      width={800}
      formRef={formRef}
      layout="vertical"
      grid={true}
      submitTimeout={3000}
      submitter={{
        searchConfig: {
          submitText: 'Confirm',
          resetText: 'Cancel',
        },
      }}
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
        onCancel: () => {
          props.onCancel();
        },
      }}
      onFinish={async (values: API.Kelompok) => {
        //values.flag_active = values.flag_active ? 'enabled' : 'disabled';

        if (props.id) {
          await updateKelompok(props.id, values);
        } else {
          await addKelompok(values);
        }

        message.success('Save successfully');
        props.onSuccess();
        return true;
      }}
      initialValues={{}}
    >
      <ProFormText
        name="code"
        label="Kode"
        colProps={{ span: 12 }}
        rules={[
          {
            required: true,
            message: 'Kode required',
          },
        ]}
      />
      <ProFormText
        name="name"
        label="Name"
        colProps={{ span: 12 }}
        rules={[
          {
            required: true,
            message: 'Name required',
          },
        ]}
      />
      <ProFormSwitch
        name="flag_active"
        label="Active"
        fieldProps={{
          checkedChildren: 'enabled',
          unCheckedChildren: 'disabled',
        }}
        colProps={{ span: 12 }}
      />
    </ModalForm>
  );
};

export default KelompokModal;
