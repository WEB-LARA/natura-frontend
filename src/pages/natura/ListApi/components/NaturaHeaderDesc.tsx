import { Button, Descriptions } from 'antd';

type NaturaHeaderAPIDescProps = {
  visible: boolean;
  data: API.CarsHeader;
};

const NaturaHeaderAPIDesc: React.FC<NaturaHeaderAPIDescProps> = (
  props: NaturaHeaderAPIDescProps,
) => {
  return (
    <Descriptions
      title="Header Data"
      size="middle"
      layout="vertical"
      bordered
      extra={<Button type="primary">Refresh</Button>}
    >
      <Descriptions.Item label="Document Number">{props.data.document_num}</Descriptions.Item>
      <Descriptions.Item label="ID Natura">{props.data.id_natura}</Descriptions.Item>
      {/* <Descriptions.Item label="Trx Date">{props.data.trx_date}</Descriptions.Item> */}
      <Descriptions.Item label="Trx Date">2018-04-24 18:00:00</Descriptions.Item>
      <Descriptions.Item label="Nilai">Rp. 400.000</Descriptions.Item>
      <Descriptions.Item label="Unit">{props.data.unit_name}</Descriptions.Item>
      <Descriptions.Item label="Cabang">{props.data.branch_name}</Descriptions.Item>
    </Descriptions>
  );
};

export default NaturaHeaderAPIDesc;
