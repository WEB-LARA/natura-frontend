import React, { useState, useEffect, useRef } from 'react';
import { useIntl } from 'umi';
import { message, Modal } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-components';
import HeaderAPIDesc from './APIHeaderDesc';
import APILinesForm from './APILinesForm';
import { getOracleAp, updateOracleAp } from '@/services/oracle/oracleap';

type APAPIModalProps = {
  onSuccess: () => void;
  onCancel: () => void;
  visible: boolean;
  title: string;
  id: string;
};

const APAPIModal: React.FC<APAPIModalProps> = (props: APAPIModalProps) => {
  const intl = useIntl();
  const detailsFormRef = useRef<ProFormInstance<API.OracleAp>>();
  const [formData, setFormData] = useState<API.OracleAp>({});

  useEffect(() => {
    if (!props.visible) {
      return;
    }

    detailsFormRef.current?.resetFields();

    if (props.id) {
      getOracleAp(props.id).then(async (res) => {
        if (res.data) {
          const data = res.data;
          console.log(data);

          detailsFormRef.current?.setFieldsValue(data);
          setFormData(data);
        }
      });
    }
  }, [props]);

  const handleFinish = async () => {
    if (formData) {
      const datadetails = await detailsFormRef.current?.validateFields();
      if (datadetails) {
        let total = 0;
        datadetails?.details?.forEach(function (value) {
          total = total + value.amount!;
        });
        if (formData.amount! != total) {
          message.error('Jumlah Total belum sama: ' + formData.amount! + ' Input: ' + total);
          return;
        }
        formData.details = datadetails?.details;
      }
      if (props.id) {
        await updateOracleAp(props.id, { ...formData });
      }
      message.success(intl.formatMessage({ id: 'component.message.success.save' }));
      props.onSuccess();
    }
  };

  return (
    <Modal
      open={props.visible}
      title={props.title}
      width={800}
      destroyOnClose
      maskClosable={false}
      okText={intl.formatMessage({ id: 'button.confirm' })}
      cancelText={intl.formatMessage({ id: 'button.cancel' })}
      onOk={async () => {
        try {
          await handleFinish();
        } catch {
          message.error(intl.formatMessage({ id: 'component.message.error.save' }));
        }
      }}
      onCancel={props.onCancel}
    >
      <HeaderAPIDesc data={formData} visible={true} />
      <br />
      <APILinesForm formRef={detailsFormRef} />
    </Modal>
  );
};

export default APAPIModal;
