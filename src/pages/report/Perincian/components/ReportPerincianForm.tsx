import React, { useState } from 'react';
import { ProForm, ProFormItem } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { Col, Input, Modal, message } from 'antd';
import NaturaHeaders from '@/pages/natura/Natura/components/NaturaHeaders';

const { Search } = Input;

type ReportPerincianFormProps = {
  formRef: React.MutableRefObject<ProFormInstance<API.ReportPerincianForm> | undefined>;
  typeDisabled: boolean;
  typePUM: boolean;
};

const ReportPerincianForm: React.FC<ReportPerincianFormProps> = (
  props: ReportPerincianFormProps,
) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <ProForm<API.ReportPerincianForm>
        formRef={props.formRef}
        layout="vertical"
        grid={true}
        submitter={false}
        initialValues={{ type: 'page', sequence: 0, statusChecked: true, properties: '{\n\n}' }}
      >
        <ProForm.Group rowProps={{ gutter: 20 }}>
          <Col span={12}>
            <ProFormItem name="id_natura" label="ID Natura">
              <Search
                placeholder="ID natura"
                onSearch={async () => {
                  setVisible(true);
                }}
                enterButton
              />
            </ProFormItem>
          </Col>
        </ProForm.Group>
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

export default ReportPerincianForm;
