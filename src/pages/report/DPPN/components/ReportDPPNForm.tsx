import React, { useState } from 'react';
import { ProForm, ProFormItem } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { Col } from 'antd';
import UnitSelect from '@/pages/master/Unit/components/UnitSelect';
import CabangSelect from '@/pages/master/Cabang/components/CabangSelect';
import AkunSelect from '@/pages/master/Akun/components/AkunSelect';
import KelompokSelect from '@/pages/master/Kelompok/components/KelompokSelect';

type ReportDPPNFormProps = {
  formRef: React.MutableRefObject<ProFormInstance<API.ReportDPPNForm> | undefined>;
};

const ReportDPPNForm: React.FC<ReportDPPNFormProps> = (props: ReportDPPNFormProps) => {
  const [unitId, setUnitId] = useState<string>('');

  return (
    <>
      <ProForm<API.ReportDPPNForm>
        formRef={props.formRef}
        layout="vertical"
        grid={true}
        submitter={false}
        initialValues={{ type: 'page', sequence: 0, statusChecked: true, properties: '{\n\n}' }}
      >
        <ProForm.Group rowProps={{ gutter: 20 }}>
          <Col span={12}>
            <ProFormItem name="unit_id" label="Unit">
              <UnitSelect
                onChange={(value: string) => {
                  setUnitId(value);
                }}
                placeholder="Select Unit"
              />
            </ProFormItem>
          </Col>
          <Col span={12}>
            <ProFormItem name="cabang_id" label="Cabang">
              <CabangSelect unitid={unitId} placeholder="Select Cabang" />
            </ProFormItem>
          </Col>
          <Col span={12}>
            <ProFormItem name="kelompok_id" label="Kelompok">
              <KelompokSelect placeholder="Select Kelompok" />
            </ProFormItem>
          </Col>
          <Col span={12}>
            <ProFormItem name="akun_id" label="Akun">
              <AkunSelect placeholder="Select Akun" />
            </ProFormItem>
          </Col>
        </ProForm.Group>
      </ProForm>
    </>
  );
};

export default ReportDPPNForm;
