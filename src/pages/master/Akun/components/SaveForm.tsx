import React, { useEffect, useRef } from 'react';
import { Col, Radio, message } from 'antd';
import {
  ModalForm,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProFormItem,
  ProFormRadio,
  ProFormMoney,
} from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { addAkun, getAkun, updateAkun } from '@/services/master/akun';
import UnitSelect from '../../Unit/components/UnitSelect';
import KelompokSelect from '../../Kelompok/components/KelompokSelect';

type AkunModalProps = {
  onSuccess: () => void;
  onCancel: () => void;
  visible: boolean;
  title: string;
  id?: string;
};

const AkunModal: React.FC<AkunModalProps> = (props: AkunModalProps) => {
  const formRef = useRef<ProFormInstance<API.Akun>>();

  useEffect(() => {
    if (!props.visible) {
      return;
    }

    formRef.current?.resetFields();
    if (props.id) {
      getAkun(props.id).then(async (res) => {
        if (res.data) {
          const data = res.data;
          formRef.current?.setFieldsValue(data);
        }
      });
    }
  }, [props]);

  const onChangePUM = (checked: boolean) => {
    if (checked) {
      formRef.current?.setFieldsValue({
        flag_template: false,
      });
    }
  };

  const onChangeTemplete = (checked: boolean) => {
    if (checked) {
      formRef.current?.setFieldsValue({
        flag_pum: false,
      });
    }
  };

  return (
    <ModalForm<API.Akun>
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
      onFinish={async (values: API.Akun) => {
        values.flag_tax_object = values.flag_tax_object ? true : false;
        values.flag_pum = values.flag_pum ? true : false;
        values.flag_template = values.flag_template ? true : false;
        values.flag_active = values.flag_active ? true : false;

        if (props.id) {
          await updateAkun(props.id, values);
        } else {
          await addAkun(values);
        }

        message.success('Save successfully');
        props.onSuccess();
        return true;
      }}
      initialValues={{}}
    >
      <Col span={12}>
        <ProFormItem
          name="unit_id"
          label="Unit"
          rules={[
            {
              required: true,
              message: 'Unit required',
            },
          ]}
        >
          <UnitSelect placeholder="Select Unit" />
        </ProFormItem>
      </Col>
      <Col span={12}>
        <ProFormItem
          name="kelompok_id"
          label="Kelompok"
          rules={[
            {
              required: true,
              message: 'Kelompok required',
            },
          ]}
        >
          <KelompokSelect placeholder="Select Kelompok" />
        </ProFormItem>
      </Col>
      <ProFormText
        name="account"
        label="Account"
        colProps={{ span: 12 }}
        rules={[
          {
            required: true,
            message: 'Account required',
          },
        ]}
      />
      <ProFormText
        name="name"
        label="Account Name"
        colProps={{ span: 12 }}
        rules={[
          {
            required: true,
            message: 'Name required',
          },
        ]}
      />
      <ProFormTextArea
        name="description"
        label="Description"
        fieldProps={{ rows: 2 }}
        colProps={{ span: 24 }}
      />

      <ProFormRadio.Group
        name="limit_type"
        colProps={{ span: 12 }}
        label="Limit Type"
        rules={[
          {
            required: true,
            message: 'Limit Type required',
          },
        ]}
        radioType="button"
        options={['Bulan', 'Tahun']}
      />
      <ProFormMoney
        label="Limit Amount"
        colProps={{ span: 12 }}
        name="limit_amount"
        fieldProps={{
          customSymbol: 'Rp ',
        }}
        min={0}
        width="md"
      />

      <ProFormSwitch
        name="flag_tax_object"
        label="Flag Tax Object"
        fieldProps={{
          checkedChildren: 'Enabled',
          unCheckedChildren: 'Disabled',
        }}
        colProps={{ span: 12 }}
      />
      <ProFormSwitch
        name="flag_pum"
        label="Flag PUM"
        fieldProps={{
          onChange: onChangePUM,
          checkedChildren: 'Enabled',
          unCheckedChildren: 'Disabled',
        }}
        colProps={{ span: 12 }}
      />
      <ProFormSwitch
        name="flag_template"
        label="Flag Template"
        fieldProps={{
          onChange: onChangeTemplete,
          checkedChildren: 'Enabled',
          unCheckedChildren: 'Disabled',
        }}
        colProps={{ span: 12 }}
      />
      <ProFormSwitch
        name="flag_active"
        label="Active"
        fieldProps={{
          defaultChecked: true,
          checkedChildren: 'Enabled',
          unCheckedChildren: 'Disabled',
        }}
        colProps={{ span: 12 }}
      />
    </ModalForm>
  );
};

export default AkunModal;
