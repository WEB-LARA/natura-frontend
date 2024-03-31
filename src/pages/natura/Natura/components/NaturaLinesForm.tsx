import React from 'react';
import { useIntl } from 'umi';
import {
  ProFormList,
  ProForm,
  ProFormItem,
  ProFormMoney,
  ProFormDigit,
} from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { Col } from 'antd';
import AkunSelect from '@/pages/master/Akun/components/AkunSelect';
import NikSelectKey from '@/pages/master/Nik/components/NikSelectKey';

type NaturaLinesFormProps = {
  formRef: React.MutableRefObject<ProFormInstance<API.NaturaLine> | undefined>;
  typePUM: boolean;
};

const NaturaLinesForm: React.FC<NaturaLinesFormProps> = (props: NaturaLinesFormProps) => {
  const intl = useIntl();

  return (
    <ProForm<API.NaturaLine> formRef={props.formRef} grid={true} submitter={false}>
      <ProForm.Group title="Details">
        <ProFormList
          name="details"
          copyIconProps={false}
          creatorButtonProps={{
            creatorButtonText: intl.formatMessage({ id: 'button.add' }),
          }}
          alwaysShowItemLabel={false}
          initialValue={[{ method: 'GET' }]}
          creatorRecord={{ method: 'GET' }}
        >
          <ProForm.Group key="id">
            <Col span={6}>
              <ProFormItem
                name="nik_id"
                label="NIK"
                rules={[
                  {
                    required: true,
                    message: 'NIK required',
                  },
                ]}
              >
                <NikSelectKey placeholder="Select NIK" />
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
                <AkunSelect flagPUM={props.typePUM} placeholder="Select Akun" />
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
