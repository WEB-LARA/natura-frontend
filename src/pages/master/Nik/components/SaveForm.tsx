import React, { useEffect, useRef, useState } from 'react';
import { Col, message } from 'antd';
import { ModalForm, ProFormText, ProFormSwitch, ProFormItem } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { addNik, getNik, updateNik } from '@/services/master/nik';
import UnitSelectCode from '../../Unit/components/UnitSelectCode';
import CabangSelectCode from '../../Cabang/components/CabangSelectCode';

type NikModalProps = {
  onSuccess: () => void;
  onCancel: () => void;
  visible: boolean;
  title: string;
  id?: string;
};

const NikModal: React.FC<NikModalProps> = (props: NikModalProps) => {
  const formRef = useRef<ProFormInstance<API.Nik>>();
  const [unitId, setUnitId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!props.visible) {
      return;
    }

    formRef.current?.resetFields();
    if (props.id) {
      setLoading(true);
      getNik(props.id).then(async (res) => {
        if (res.data) {
          const data = res.data;
          //  data.statusChecked = data.status === 0;
          setUnitId(data.unit_id!);
          formRef.current?.setFieldsValue(data);
        }
      });
      setLoading(false);
    }
  }, [props]);

  return (
    <ModalForm<API.Nik>
      open={props.visible}
      title={props.title}
      width={800}
      formRef={formRef}
      layout="vertical"
      grid={true}
      loading={loading}
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
      onFinish={async (values: API.Nik) => {
        //values.status = values.statusChecked ? 0 : 1;
        delete values.statusChecked;

        if (props.id) {
          await updateNik(props.id, values);
        } else {
          await addNik(values);
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
          <UnitSelectCode
            onChange={(value: string) => {
              setUnitId(value);
            }}
            placeholder="Select Unit"
          />
        </ProFormItem>
      </Col>

      <Col span={12}>
        <ProFormItem
          name="cabang_id"
          label="Cabang"
          rules={[
            {
              required: true,
              message: 'Cabang required',
            },
          ]}
        >
          <CabangSelectCode unitid={unitId} placeholder="Select Cabang" />
        </ProFormItem>
      </Col>

      <ProFormText
        name="nik"
        label="NIK"
        colProps={{ span: 12 }}
        rules={[
          {
            required: true,
            message: 'NIK required',
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
        name="flag_aktif"
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

export default NikModal;
