import React from 'react';
import { useIntl } from 'umi';
import {
  ProFormList,
  ProForm,
  ProFormItem,
  ProFormMoney,
  ProFormText,
} from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { Col } from 'antd';
import NikSelectKey from '@/pages/master/Nik/components/NikSelectKey';

type APILinesFormProps = {
  formRef: React.MutableRefObject<ProFormInstance<API.OracleAp> | undefined>;
};

const APILinesForm: React.FC<APILinesFormProps> = (props: APILinesFormProps) => {
  const intl = useIntl();

  return (
    <ProForm<API.OracleAp> formRef={props.formRef} grid={true} submitter={false}>
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
            <Col span={12}>
              <ProFormItem
                name="nik"
                label="NIK"
                rules={[
                  {
                    required: true,
                    message: 'NIK required',
                  },
                ]}
              >
                <NikSelectKey
                  onChange={(value: any) => {
                    console.log(value);
                  }}
                  placeholder="Select NIK"
                />
              </ProFormItem>
              <ProFormText name="nik_num" label="nik_num" hidden={true} />
            </Col>
            <ProFormMoney
              label="Amount"
              colProps={{ span: 8 }}
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

export default APILinesForm;
