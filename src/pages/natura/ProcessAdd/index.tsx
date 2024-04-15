import type { ProFormInstance } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProFormDatePicker, StepsForm } from '@ant-design/pro-components';
import { PageHeader, message } from 'antd';
import { useRef, useState } from 'react';
import ListNaturas from './components/ListNaturas';
import ResultProcess from './components/ResultProcess';
import { createNaturaProcessHeader } from '@/services/natura/processedheader';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const ProcessAdd: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const [period, setPeriod] = useState<string>('');

  return (
    <>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Process Batch Natura"
        subTitle="Form Natura untuk process data dengan menjumlahkan penghasilan natura per NIK"
      />

      <PageContainer>
        <ProCard>
          <StepsForm<{
            name: string;
          }>
            formRef={formRef}
            onFinish={async () => {
              await waitTime(1000);
              message.success('Success Process');
            }}
            formProps={{
              validateMessages: {
                required: 'harus diisi',
              },
            }}
          >
            <StepsForm.StepForm<{
              name: string;
            }>
              name="base"
              title="Fill in Process"
              stepProps={{
                description: 'Periode yang akan di Process',
              }}
              onFinish={async () => {
                console.log(formRef.current?.getFieldsValue());
                const formdata = formRef.current?.getFieldsValue();
                setPeriod(formdata.date.format('MM-YYYY'));
                // TODO: check data not found in oracle and natura
                return true;
              }}
            >
              <ProFormDatePicker.Month
                rules={[{ required: true }]}
                name="date"
                label="Date"
                width="lg"
              />
            </StepsForm.StepForm>
            <StepsForm.StepForm<{
              checkbox: string;
            }>
              name="checkbox"
              title="Confirm Natura"
              stepProps={{
                description: 'List natura here',
              }}
              onFinish={async () => {
                // TODO: call process API

                await createNaturaProcessHeader({ period: period });

                console.log(formRef.current?.getFieldsValue());
                return true;
              }}
            >
              <ListNaturas period={period} />
              <br />
            </StepsForm.StepForm>
            <StepsForm.StepForm
              name="done"
              title="Done"
              stepProps={{
                description: 'Process Done',
              }}
            >
              <ResultProcess />
            </StepsForm.StepForm>
          </StepsForm>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default ProcessAdd;
