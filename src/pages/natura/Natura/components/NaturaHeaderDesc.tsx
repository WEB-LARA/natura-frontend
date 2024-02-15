import { Badge, Descriptions } from 'antd';

type NaturaHeaderDescProps = {
  visible: boolean;
  data: API.NaturaHeader;
};

const NaturaHeaderDesc: React.FC<NaturaHeaderDescProps> = (props: NaturaHeaderDescProps) => {
  return (
    <Descriptions title="Header Data" size="middle" layout="vertical" bordered>
      <Descriptions.Item label="Status">
        <Badge status="processing" text="Running" />
      </Descriptions.Item>
      <Descriptions.Item label="ID Natura">{props.data.id_natura}</Descriptions.Item>
      {/* <Descriptions.Item label="Trx Date">{props.data.trx_date}</Descriptions.Item> */}
      <Descriptions.Item label="Trx Date">2018-04-24 18:00:00</Descriptions.Item>
      <Descriptions.Item label="Total">
        Rp. {String(props.data.total).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </Descriptions.Item>
      <Descriptions.Item label="Unit">{props.data.unit_id}</Descriptions.Item>
      <Descriptions.Item label="Cabang">{props.data.cabang_id}</Descriptions.Item>
    </Descriptions>
  );
};

export default NaturaHeaderDesc;
