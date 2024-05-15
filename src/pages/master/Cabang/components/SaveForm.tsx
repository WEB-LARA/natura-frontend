import React, { useEffect, useRef, useState } from 'react';
import { Col, message } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormSwitch,
  ProFormItem,
  ProSkeleton,
} from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { addCabang, getCabang, updateCabang } from '@/services/master/cabang';
import UnitSelect from '../../Unit/components/UnitSelect';

type CabangModalProps = {
  onSuccess: () => void;
  onCancel: () => void;
  visible: boolean;
  title: string;
  id?: string;
};

const CabangModal: React.FC<CabangModalProps> = (props: CabangModalProps) => {
  const formRef = useRef<ProFormInstance<API.Cabang>>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!props.visible) {
      return;
    }

    formRef.current?.resetFields();
    if (props.id) {
      setLoading(true);
      getCabang(props.id).then(async (res) => {
        if (res.data) {
          const data = res.data;
          //data.statusChecked = data.status === 'enabled';
          formRef.current?.setFieldsValue(data);
        }
      });
      setLoading(false);
    }
  }, [props]);

  return (
    <ModalForm<API.Cabang>
      open={props.visible}
      title={props.title}
      width={800}
      formRef={formRef}
      layout="vertical"
      grid={true}
      rowProps={{ gutter: 20 }}
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
      onFinish={async (values: API.Cabang) => {
        // values.status = values.statusChecked ? 'enabled' : 'disabled';
        //values.unit_id = values.unit?.id;
        delete values.statusChecked;

        console.log(values);
        if (props.id) {
          await updateCabang(props.id, values);
        } else {
          await addCabang(values);
        }

        message.success('Save successfully');
        props.onSuccess();
        return true;
      }}
      initialValues={{}}
    >
      {loading ? (
        <ProSkeleton type="descriptions" list={false} />
      ) : (
        <>
          <ProFormText
            name="code"
            label="Kode Cabang"
            colProps={{ span: 12 }}
            rules={[
              {
                required: true,
                message: 'Kode required',
              },
            ]}
          />
          <ProFormText
            name="dc_code"
            label="Kode DC"
            tooltip="Kode untuk keperluan dengan SD2"
            colProps={{ span: 12 }}
            rules={[
              {
                required: true,
                message: 'Kode DC required',
              },
            ]}
          />
          <ProFormText
            name="reference_id"
            label="Reference Id"
            tooltip="Reference Id Example: 16,70,44"
            colProps={{ span: 12 }}
            rules={[
              {
                required: true,
                message: 'Reference Id required',
              },
            ]}
          />
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
              checkedChildren: true,
              unCheckedChildren: false,
            }}
            colProps={{ span: 12 }}
          />
        </>
      )}
    </ModalForm>
  );
};

export default CabangModal;
