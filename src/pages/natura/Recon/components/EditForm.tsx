import React, { useEffect, useRef } from 'react';
import { message } from 'antd';
import { ModalForm, ProFormText, StatisticCard } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { getNaturaHeader, updateNaturaHeader } from '@/services/natura/naturaheader';
import ListNaturaLines from './ListNaturaLines';

const { Operation } = StatisticCard;

type ReconModalProps = {
  onSuccess: () => void;
  onCancel: () => void;
  visible: boolean;
  title: string;
  id: string;
};

const ReconModal: React.FC<ReconModalProps> = (props: ReconModalProps) => {
  const formRef = useRef<ProFormInstance<API.NaturaRecon>>();

  useEffect(() => {
    if (!props.visible) {
      return;
    }

    formRef.current?.resetFields();
    if (props.id) {
      // TODO: Get Total Oracle
      getNaturaHeader(props.id).then(async (res) => {
        if (res.data) {
          const data = res.data;
          //data.statusChecked = data.status === 'enabled';
          formRef.current?.setFieldsValue(data);
        }
      });
    }
  }, [props]);

  return (
    <ModalForm<API.NaturaRecon>
      open={props.visible}
      title={props.title}
      width={800}
      formRef={formRef}
      layout="vertical"
      grid={true}
      submitTimeout={3000}
      submitter={{
        searchConfig: {
          submitText: 'Confirm',
          resetText: 'Cancel',
        },
      }}
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
        onCancel: () => {
          props.onCancel();
        },
      }}
      onFinish={async (values: API.NaturaRecon) => {
        //values.status = values.statusChecked ? 'enabled' : 'disabled';
        delete values.statusChecked;

        if (props.id) {
          await updateNaturaHeader(props.id, values);
        }

        message.success('Save successfully');
        props.onSuccess();
        return true;
      }}
      initialValues={{}}
    >
      <ProFormText name="id_natura" label="ID Natura" colProps={{ span: 12 }} disabled={true} />
      <ProFormText name="code" label="Kode Natura" colProps={{ span: 12 }} hidden={true} />
      <StatisticCard.Group>
        <StatisticCard
          statistic={{
            title: 'Total Natura',
            value: 212,
          }}
        />
        <Operation>-</Operation>
        <StatisticCard
          statistic={{
            title: 'Total Oracle',
            value: 112,
          }}
        />
        <Operation>=</Operation>
        <StatisticCard
          statistic={{
            title: 'Selisih',
            value: 100,
          }}
        />
      </StatisticCard.Group>
      <ListNaturaLines idheader={props.id} />
    </ModalForm>
  );
};

export default ReconModal;
