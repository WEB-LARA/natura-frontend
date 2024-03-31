import React, { useState } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormItem,
  ProFormDatePicker,
} from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { Col } from 'antd';
import UnitSelect from '@/pages/master/Unit/components/UnitSelect';
import CabangSelect from '@/pages/master/Cabang/components/CabangSelect';

type NaturaFormProps = {
  formRef: React.MutableRefObject<ProFormInstance<API.NaturaHeader> | undefined>;
  typeDisabled: boolean;
  typePUM: boolean;
};

const NaturaForm: React.FC<NaturaFormProps> = (props: NaturaFormProps) => {
  const [unitId, setUnitId] = useState<string>('');

  return (
    <ProForm<API.NaturaHeader>
      formRef={props.formRef}
      layout="vertical"
      grid={true}
      submitter={false}
      initialValues={{ type: 'page', sequence: 0, statusChecked: true, properties: '{\n\n}' }}
    >
      <ProForm.Group title="Natura Header" rowProps={{ gutter: 20 }}>
        <ProFormText
          disabled
          name="id_natura"
          label="ID Natura"
          placeholder="Auto Generate"
          colProps={{ span: 12 }}
        />
        <ProFormDatePicker
          width="sm"
          name="transaction_date"
          label="Transaction Date"
          colProps={{ span: 12 }}
          rules={[
            {
              required: true,
              message: 'Transaction Date required',
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
            <UnitSelect
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
            <CabangSelect unitid={unitId} placeholder="Select Cabang" />
          </ProFormItem>
        </Col>
        <Col span={12}>
          <ProFormItem
            hidden={!props.typePUM}
            name="wilayah_id"
            label="Wilayah"
            rules={[
              {
                required: props.typePUM,
                message: 'Wilayah required',
              },
            ]}
          >
            <CabangSelect unitid={unitId} placeholder="Select Wilayah" />
          </ProFormItem>
        </Col>
        <ProFormTextArea
          name="description"
          tooltip="keterangan"
          label="Description"
          fieldProps={{ rows: 3 }}
          colProps={{ span: 24 }}
        />
      </ProForm.Group>
    </ProForm>
  );
};

export default NaturaForm;
