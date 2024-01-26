import React, { useEffect, useRef } from 'react';
import { message } from 'antd';
import { ModalForm, ProFormText, ProFormSwitch } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { addUnit, getUnit, updateUnit } from '@/services/master/unit';

type UnitModalProps = {
  onSuccess: () => void;
  onCancel: () => void;
  visible: boolean;
  title: string;
  id?: string;
};

const UnitModal: React.FC<UnitModalProps> = (props: UnitModalProps) => {
  const formRef = useRef<ProFormInstance<API.Unit>>();

  useEffect(() => {
    if (!props.visible) {
      return;
    }

    formRef.current?.resetFields();
    if (props.id) {
      getUnit(props.id).then(async (res) => {
        if (res.data) {
          const data = res.data;
          data.statusChecked = data.status === 'enabled';
          formRef.current?.setFieldsValue(data);
        }
      });
    }
  }, [props]);

  return (
    <ModalForm<API.Unit>
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
      onFinish={async (values: API.Unit) => {
        values.status = values.statusChecked ? 'enabled' : 'disabled';
        delete values.statusChecked;

        if (props.id) {
          await updateUnit(props.id, values);
        } else {
          await addUnit(values);
        }

        message.success('Save successfully');
        props.onSuccess();
        return true;
      }}
      initialValues={{}}
    >
      <ProFormText
        name="code"
        label="Kode Unit"
        colProps={{ span: 12 }}
        rules={[
          {
            required: true,
            message: 'Kode required',
          },
        ]}
      />
      <ProFormText
        name="code2"
        label="Kode Inisial"
        tooltip="Kode untuk keperluan dengan SD2"
        colProps={{ span: 12 }}
        rules={[
          {
            required: true,
            message: 'Kode Inisial required',
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

      <ProFormSwitch
        name="statusChecked"
        label="Active"
        fieldProps={{
          checkedChildren: 'Enabled',
          unCheckedChildren: 'Disabled',
        }}
        colProps={{ span: 12 }}
      />
    </ModalForm>
  );
};

export default UnitModal;
