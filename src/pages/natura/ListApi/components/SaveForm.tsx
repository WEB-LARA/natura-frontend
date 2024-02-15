import React, { useState, useEffect, useRef } from 'react';
import { useIntl } from 'umi';
import { message, Modal } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-components';
import NaturaLinesForm from '../../Natura/components/NaturaLinesForm';
import { getCarsApiHeader } from '@/services/natura/naturaapi';
import NaturaHeaderAPIDesc from './NaturaHeaderDesc';

type TampFileHeaderModalProps = {
  onSuccess: () => void;
  onCancel: () => void;
  visible: boolean;
  title: string;
  id: string;
};

const TampFileHeaderModal: React.FC<TampFileHeaderModalProps> = (
  props: TampFileHeaderModalProps,
) => {
  const intl = useIntl();
  const naturaFormRef = useRef<ProFormInstance<API.CarsHeader>>();
  const detailsFormRef = useRef<ProFormInstance<API.NaturaHeader>>();
  const [formData, setFormData] = useState<API.CarsHeader>({});

  useEffect(() => {
    if (!props.visible) {
      return;
    }

    naturaFormRef.current?.resetFields();
    detailsFormRef.current?.resetFields();

    if (props.id) {
      getCarsApiHeader(props.id).then(async (res) => {
        if (res.data) {
          const data = res.data;

          naturaFormRef.current?.setFieldsValue(data);
          detailsFormRef.current?.setFieldsValue(data);
          setFormData(data);
        }
      });
    }
  }, [props]);

  const handleFinish = async () => {
    const natura = await naturaFormRef.current?.validateFields();
    if (natura) {
      delete natura.statusChecked;

      const naturadetails = await detailsFormRef.current?.validateFields();
      if (naturadetails) {
        // natura.details = naturadetails?.details;
      }

      if (props.id) {
        //delete formData.details;
        //await updateTampFileHeader(props.id, { ...formData, ...natura });
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
      <NaturaHeaderAPIDesc data={formData} visible={true} />
      <br />
      <NaturaLinesForm formRef={detailsFormRef} />
    </Modal>
  );
};

export default TampFileHeaderModal;
