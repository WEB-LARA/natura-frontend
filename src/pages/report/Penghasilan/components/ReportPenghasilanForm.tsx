import React, { useState } from 'react';
import { ProForm, ProFormItem, ProFormRadio, ProFormDatePicker } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { Col, Modal, message } from 'antd';
import UnitSelect from '@/pages/master/Unit/components/UnitSelect';
import CabangSelect from '@/pages/master/Cabang/components/CabangSelect';
import AkunSelect from '@/pages/master/Akun/components/AkunSelect';
import KelompokSelect from '@/pages/master/Kelompok/components/KelompokSelect';
import NaturaHeaders from '@/pages/natura/Natura/components/NaturaHeaders';

type ReportPenghasilanFormProps = {
  formRef: React.MutableRefObject<ProFormInstance<API.ReportPenghasilanForm> | undefined>;
  typeDisabled: boolean;
};

const ReportPenghasilanForm: React.FC<ReportPenghasilanFormProps> = (
  props: ReportPenghasilanFormProps,
) => {
  const [unitId, setUnitId] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <ProForm<API.ReportPenghasilanForm>
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
          <ProFormRadio.Group
            name="print_period"
            colProps={{ span: 12 }}
            label="Tampilan"
            rules={[
              {
                required: true,
                message: 'Tampilan required',
              },
            ]}
            radioType="button"
            options={['Bulan', 'Tahun']}
          />
        </ProForm.Group>
        <ProFormDatePicker.Month
          name="period"
          rules={[
            {
              required: true,
              message: 'Periode required',
            },
          ]}
          label="Periode"
        />
      </ProForm>

      <Modal
        open={visible}
        title="Pilih Natura"
        width={800}
        destroyOnClose
        maskClosable={false}
        okText="confirm"
        cancelText="cancel"
        onOk={async () => {
          try {
            //await handleFinish();
          } catch {
            message.error('Err ');
          }
        }}
        onCancel={async () => {
          setVisible(false);
        }}
      >
        <NaturaHeaders
          onSelect={async (id_natura: string) => {
            props.formRef.current?.setFieldsValue({
              id_natura: id_natura,
            });
            setVisible(false);
          }}
        />
      </Modal>
    </>
  );
};

export default ReportPenghasilanForm;
