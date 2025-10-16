import React, { useState } from 'react';
import {
  ProForm,
  ProFormItem,
  ProFormDateRangePicker,
} from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { Col, Select, message } from 'antd';
import UnitSelect from '@/pages/master/Unit/components/UnitSelect';
import CabangSelect from '@/pages/master/Cabang/components/CabangSelect';
import AkunSelect from '@/pages/master/Akun/components/AkunSelect';
import KelompokSelect from '@/pages/master/Kelompok/components/KelompokSelect';

type ReportLRDRFormProps = {
  formRef: React.MutableRefObject<ProFormInstance<API.ReportDPPNForm> | undefined>;
  typeDisabled?: boolean;
  typePUM?: boolean;
};

const ReportLRDRForm: React.FC<ReportLRDRFormProps> = (props: ReportLRDRFormProps) => {
  const [unitId, setUnitId] = useState<string>('');

  return (
    <ProForm<API.ReportDPPNForm>
      formRef={props.formRef}
      layout="vertical"
      grid={true}
      submitter={false}
      initialValues={{
        objek_pajak: 'ALL',
        status: 'ALL',
      }}
    >
      <ProForm.Group rowProps={{ gutter: 20 }}>
        {/* Periode - Required */}
        <ProFormDateRangePicker
          name="period"
          label="Periode"
          colProps={{ span: 12 }}
          rules={[{ required: true, message: 'Periode harus diisi!' }]}
          fieldProps={{
            format: 'YYYY-MM-DD',
          }}
        />

        {/* Unit */}
        <Col span={12}>
          <ProFormItem name="unit_id" label="Unit">
            <UnitSelect
              placeholder="Pilih Unit (Opsional)"
              onChange={(value) => setUnitId(value)}
              allowClear
            />
          </ProFormItem>
        </Col>

        {/* Cabang */}
        <Col span={12}>
          <ProFormItem name="cabang_id" label="Cabang">
            <CabangSelect 
              unitid={unitId} 
              placeholder="Pilih Cabang (Opsional)" 
              allowClear
            />
          </ProFormItem>
        </Col>

        {/* Objek Pajak */}
        <Col span={12}>
          <ProFormItem 
            name="objek_pajak" 
            label="Objek Pajak"
            rules={[{ required: true, message: 'Objek Pajak harus dipilih!' }]}
          >
            <Select
              placeholder="Pilih Objek Pajak"
              options={[
                { label: 'Semua', value: 'ALL' },
                { label: 'Objek Pajak PPh ps 21', value: 'OBJEK_PPH21' },
                { label: 'Bukan Objek Pajak PPh ps 21', value: 'BUKAN_OBJEK_PPH21' },
              ]}
            />
          </ProFormItem>
        </Col>

        {/* Kelompok */}
        <Col span={12}>
          <ProFormItem name="kelompok_id" label="Kelompok">
            <KelompokSelect 
              placeholder="Pilih Kelompok (Opsional)" 
              allowClear
            />
          </ProFormItem>
        </Col>

        {/* Akun */}
        <Col span={12}>
          <ProFormItem name="akun_id" label="Akun">
            <AkunSelect 
              placeholder="Pilih Akun (Opsional)" 
              allowClear
            />
          </ProFormItem>
        </Col>

      </ProForm.Group>
    </ProForm>
  );
};

export default ReportLRDRForm;