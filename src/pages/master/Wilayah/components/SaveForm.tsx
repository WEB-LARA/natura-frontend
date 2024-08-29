import React, { useEffect, useRef } from 'react';
import { message } from 'antd';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { addWilayah, getWilayah, updateWilayah } from '@/services/master/wilayah';

type WilayahModalProps = {
  onSuccess: () => void;
  onCancel: () => void;
  visible: boolean;
  title: string;
  id?: string;
};

const WilayahModal: React.FC<WilayahModalProps> = (props: WilayahModalProps) => {
  const formRef = useRef<ProFormInstance<API.Wilayah>>();

  useEffect(() => {
    if (!props.visible) {
      return;
    }

    formRef.current?.resetFields();
    if (props.id) {
      getWilayah(props.id).then(async (res) => {
        if (res.data) {
          const data = res.data;
          //data.statusChecked = data.status === 'enabled';
          formRef.current?.setFieldsValue(data);
        }
      });
    }
  }, [props]);

  return (
    <ModalForm<API.Wilayah>
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
      onFinish={async (values: API.Wilayah) => {
        // values.status = values.statusChecked ? 'enabled' : 'disabled';
        //delete values.statusChecked;

        if (props.id) {
          await updateWilayah(props.id, values);
        } else {
          await addWilayah(values);
        }

        message.success('Save successfully');
        props.onSuccess();
        return true;
      }}
      initialValues={{}}
    >
      <ProFormText
        name="code"
        label="Kode Wilayah"
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
            message: 'Prefix required',
          },
        ]}
      />
    </ModalForm>
  );
};

export default WilayahModal;
