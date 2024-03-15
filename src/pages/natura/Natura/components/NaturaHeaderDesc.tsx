import type { StatusCase } from '@/utils/util';
import { codeToStatusCase } from '@/utils/util';
import { Badge, Descriptions, Steps } from 'antd';

type NaturaHeaderDescProps = {
  visible: boolean;
  data: API.NaturaHeader;
};

const NaturaHeaderDesc: React.FC<NaturaHeaderDescProps> = (props: NaturaHeaderDescProps) => {
  const description = 'This is a description.';
  const stt: StatusCase = codeToStatusCase(props.data.status);
  const isErr: 'wait' | 'process' | 'finish' | 'error' =
    props.data.status! >= 50 ? 'error' : 'wait';
  const currentStep: number =
    props.data.status! >= 50 ? props.data.status! % 10 : props.data.status!;

  return (
    <>
      <Steps
        size="small"
        status={isErr}
        current={currentStep}
        items={[
          {
            title: 'New',
            description,
          },
          {
            title: 'Recon',
            description,
          },
          {
            title: 'Process',
            description,
          },
          {
            title: 'Ready',
            description,
          },
          {
            title: 'Send',
            description,
          },
        ]}
      />
      <br />
      <Descriptions
        title={'ID Natura: ' + props.data.id_natura}
        size="middle"
        layout="vertical"
        bordered
      >
        <Descriptions.Item label="Status">
          <Badge status={stt.status} text={stt.tulis} />
        </Descriptions.Item>
        {/* <Descriptions.Item label="Trx Date">{props.data.trx_date}</Descriptions.Item> */}
        <Descriptions.Item label="Trx Date">2018-04-24</Descriptions.Item>
        <Descriptions.Item label="Total">
          Rp. {String(props.data.total).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Descriptions.Item>
        <Descriptions.Item label="Unit">{props.data.unit?.name}</Descriptions.Item>
        <Descriptions.Item label="Cabang">{props.data.cabang?.name}</Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default NaturaHeaderDesc;
