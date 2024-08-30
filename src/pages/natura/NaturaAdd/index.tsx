import type { ProFormInstance } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProForm } from '@ant-design/pro-components';
import React, { useRef, useState, useEffect } from 'react';
import NaturaForm from '../Natura/components/NaturaForm';
import NaturaLinesForm from '../Natura/components/NaturaLinesForm';
import {
  addNaturaHeader,
  getNaturaHeader,
  updateNaturaHeader,
} from '@/services/natura/naturaheader';
import { Modal, PageHeader, Tabs, message } from 'antd';
import { useParams, history } from 'umi';
import ModalSave from './components/ModalSave';

const { TabPane } = Tabs;

const NaturaAdd: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState<string>('Add Natura');
  const naturaFormRef = useRef<ProFormInstance<API.NaturaHeader>>();
  const detailsFormRef = useRef<ProFormInstance<API.NaturaHeader>>();
  const [formData, setFormData] = useState<API.NaturaHeader>({});
  const [modalSave, setModalSave] = useState<boolean>(false);
  const [noNaturaSave, setNoNaturaSave] = useState<string>('');
  const [kelompokID, setKelompokID] = useState<string | undefined>();
  const [activeKey, setActiveKey] = useState<string>('pum');

  useEffect(() => {
    naturaFormRef.current?.resetFields();
    detailsFormRef.current?.resetFields();

    if (id) {
      setTitle('Edit Natura');
      getNaturaHeader(id).then(async (res) => {
        if (res.data) {
          const data = res.data;
          if (data.flag_pum) {
            setActiveKey('pum');
          } else {
            setActiveKey('other');
          }

          naturaFormRef.current?.setFieldsValue(data);
          detailsFormRef.current?.setFieldsValue(data);

          setKelompokID(data.kelompok_id);
          setFormData(data);
        }
      });
    }
  }, [id]);

  const handleFinish = async () => {
    const natura = await naturaFormRef.current?.validateFields();
    if (natura) {
      natura.flag_pum = activeKey === 'pum' ? true : false;
      natura.wilayah_id = activeKey === 'pum' ? natura.wilayah_id : '1';
      delete natura.statusChecked;

      const naturadetails = await detailsFormRef.current?.validateFields();
      if (naturadetails) {
        natura.details = naturadetails?.details;
      }

      if (id) {
        try {
          delete formData.details;
          const dataupdate = await updateNaturaHeader(id, { ...formData, ...natura });
          if (dataupdate.success) {
            const subtitle: string = 'EDIT ID NATURA :' + formData.id_natura;
            message.success('Edit successfully');
            setNoNaturaSave(subtitle);
            setModalSave(true);
          }
        } catch (e) {
          const subtitleErr: string = ' Error: ' + e;
          Modal.error({
            title: 'Error Save Natura',
            content: subtitleErr,
          });
        }
      } else {
        try {
          const datainsert = await addNaturaHeader(natura);

          if (datainsert.success) {
            const result: string[] = [];
            const resultMsg: string[] = [];
            let subMsg: string = '';
            if (datainsert.data && datainsert.data.message && datainsert.data.message.length > 0) {
              datainsert.data!.message!.forEach((data) => {
                resultMsg.push(data!);
              });
              subMsg = '. Warning: ' + resultMsg.join(', ');
            }

            if (
              datainsert.data &&
              datainsert.data.natura_headers &&
              datainsert.data.natura_headers.length > 0
            ) {
              datainsert.data!.natura_headers!.forEach((data) => {
                result.push(data!.id_natura!);
              });
            }

            const subtitle: string = 'ID NATURA :' + result.join(', ') + ' ' + subMsg;
            message.success('Save successfully');
            setNoNaturaSave(subtitle);
            setModalSave(true);
          }
        } catch (e) {
          const subtitleErr: string = ' Error: ' + e;
          Modal.error({
            title: 'Error Save Natura',
            content: subtitleErr,
          });
        }
      }
    }
  };

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  return (
    <>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={title}
        subTitle="Form Natura untuk isi manual"
      />

      <PageContainer ghost>
        <ProCard>
          <Tabs
            activeKey={activeKey}
            onChange={onChange}
            tabPosition="top"
            defaultActiveKey="pum"
            style={{ background: '#fff', paddingBottom: 50 }}
          >
            <TabPane key="pum" style={{ justifyContent: 'center' }} tab="PUM / Petty Cash">
              <ProForm<API.NaturaHeader>
                onFinish={async () => {
                  try {
                    await handleFinish();
                  } catch {
                    message.error('Failed to save');
                  }
                }}
              >
                <NaturaForm
                  formRef={naturaFormRef}
                  typeDisabled={id ? true : false}
                  typePUM={true}
                />
                <NaturaLinesForm kelompokId={kelompokID} formRef={detailsFormRef} typePUM={true} />
              </ProForm>
            </TabPane>
            <TabPane key="other" style={{ justifyContent: 'center' }} tab="Other">
              <ProForm<API.NaturaHeader>
                onFinish={async () => {
                  try {
                    await handleFinish();
                  } catch {
                    message.error('Failed to save');
                  }
                }}
              >
                <NaturaForm
                  formRef={naturaFormRef}
                  typeDisabled={id ? true : false}
                  typePUM={false}
                />
                <NaturaLinesForm kelompokId={kelompokID} formRef={detailsFormRef} typePUM={false} />
              </ProForm>
            </TabPane>
          </Tabs>
        </ProCard>
      </PageContainer>

      <ModalSave
        visible={modalSave}
        subTitle={noNaturaSave}
        onCancel={() => {
          naturaFormRef.current?.resetFields();
          detailsFormRef.current?.resetFields();
          setModalSave(false);
        }}
        onSuccess={() => {
          history.push(`/natura`);
        }}
      />
    </>
  );
};

export default NaturaAdd;
