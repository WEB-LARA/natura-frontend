import type { ProFormInstance } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProFormDatePicker, StepsForm } from '@ant-design/pro-components';
import { PageHeader, message } from 'antd';
import { useRef, useState } from 'react';
import ListNaturasError from './components/ListNaturasError';
import ResultRecon from './components/ResultRecon';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Recon: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const [period, setPeriod] = useState<string>('');

  return (
    <>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Reconciliation Natura"
        subTitle="Form Natura untuk reconciliation dengan data di oracle"
      />

      <PageContainer>
        <ProCard>
          <StepsForm<{
            name: string;
          }>
            formRef={formRef}
            onFinish={async () => {
              await waitTime(1000);
              message.success('Success Recon');
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
              title="Fill in Periode"
              stepProps={{
                description: 'Periode yang akan di Reconciliation',
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
                description: 'Fix the natura error here',
              }}
              onFinish={async () => {
                // TODO: check is still error in that period

                console.log(formRef.current?.getFieldsValue());
                return true;
              }}
            >
              <ListNaturasError period={period} />
              <br />
            </StepsForm.StepForm>
            <StepsForm.StepForm
              name="done"
              title="Done"
              stepProps={{
                description: 'Reconciliation Done',
              }}
            >
              <ResultRecon />
            </StepsForm.StepForm>
          </StepsForm>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default Recon;
