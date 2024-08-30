import React from 'react';
import {
  ProFormList,
  ProForm,
  ProFormItem,
  ProFormMoney,
  ProFormDigit,
} from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { Col, Form } from 'antd';
import AkunSelect from '@/pages/master/Akun/components/AkunSelect';
import NikSelectNik from '@/pages/master/Nik/components/NikSelectNik';

type NaturaLinesFormProps = {
  formRef: React.MutableRefObject<ProFormInstance<API.NaturaLine> | undefined>;
  typePUM: boolean;
  kelompokId?: string;
  nikID?: string;
};

const NaturaLinesForm: React.FC<NaturaLinesFormProps> = (props: NaturaLinesFormProps) => {
  const [form] = Form.useForm();

  return (
    <ProForm<API.NaturaLine> form={form} formRef={props.formRef} grid={true} submitter={false}>
      <ProForm.Group title="Details">
        <ProFormList
          name="details"
          copyIconProps={false}
          creatorButtonProps={{
            creatorButtonText: 'Add Detail',
          }}
          alwaysShowItemLabel={false}
          initialValue={[{ method: 'GET' }]}
          creatorRecord={{ method: 'GET' }}
        >
          <ProForm.Group key="id">
            <Col span={6}>
              <ProFormItem
                name="nik_num"
                label="NIK"
                rules={[
                  {
                    required: true,
                    message: 'NIK required',
                  },
                ]}
              >
                <NikSelectNik
                  onChange={(value) => {
                    console.log('NikSelectKey Selected');
                    console.log(value);
                  }}
                  placeholder="Select NIK"
                />
              </ProFormItem>
            </Col>
            <Col span={8}>
              <ProFormItem
                name="akun_id"
                label="Akun"
                rules={[
                  {
                    required: true,
                    message: 'Akun required',
                  },
                ]}
              >
                <AkunSelect
                  kelompokId={props.kelompokId}
                  flagPUM={props.typePUM}
                  placeholder="Select Akun"
                />
              </ProFormItem>
            </Col>
            <ProFormDigit
              hidden={!props.typePUM}
              name="total_qty"
              label="Qty"
              width="sm"
              colProps={{ span: 4 }}
              rules={[
                {
                  required: props.typePUM,
                  message: 'Jumlah required',
                },
              ]}
            />
            <ProFormMoney
              label="Amount"
              colProps={{ span: 6 }}
              name="amount"
              fieldProps={{
                customSymbol: 'Rp ',
              }}
              min={0}
              width="md"
            />
          </ProForm.Group>
        </ProFormList>
      </ProForm.Group>
    </ProForm>
  );
};

export default NaturaLinesForm;
