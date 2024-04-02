import React, { useEffect, useRef } from 'react';
import { message } from 'antd';
import { ModalForm, ProFormText, ProFormSwitch } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { addSource, getSource, updateSource } from '@/services/master/source';

type SourceModalProps = {
  onSuccess: () => void;
  onCancel: () => void;
  visible: boolean;
  title: string;
  id?: string;
};

const SourceModal: React.FC<SourceModalProps> = (props: SourceModalProps) => {
  const formRef = useRef<ProFormInstance<API.Source>>();

  useEffect(() => {
    if (!props.visible) {
      return;
    }

    formRef.current?.resetFields();
    if (props.id) {
      getSource(props.id).then(async (res) => {
        if (res.data) {
          const data = res.data;
          //data.statusChecked = data.status === 'enabled';
          formRef.current?.setFieldsValue(data);
        }
      });
    }
  }, [props]);

  return (
    <ModalForm<API.Source>
      open={props.visible}
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
      onFinish={async (values: API.Source) => {
        if (props.id) {
          await updateSource(props.id, values);
        } else {
          await addSource(values);
        }

        message.success('Save successfully');
        props.onSuccess();
        return true;
      }}
      initialValues={{}}
    >
      <ProFormText
        name="name"
        label="Name"
        colProps={{ span: 12 }}
        rules={[
          {
            required: true,
            message: 'Prefix required',
          },
        ]}
      />

      <ProFormSwitch
        name="gen_id_natura"
        label="Generate ID Natura"
        fieldProps={{
          checkedChildren: true,
          unCheckedChildren: false,
        }}
        colProps={{ span: 12 }}
      />

      <ProFormSwitch
        name="flag_active"
        label="Active"
        fieldProps={{
          checkedChildren: true,
          unCheckedChildren: false,
        }}
        colProps={{ span: 12 }}
      />
    </ModalForm>
  );
};

export default SourceModal;
