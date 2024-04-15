import { Button, Descriptions } from 'antd';

type HeaderAPIDescProps = {
  visible: boolean;
  data: API.OracleGl | API.OracleAp;
};

const HeaderAPIDesc: React.FC<HeaderAPIDescProps> = (props: HeaderAPIDescProps) => {
  return (
    <Descriptions
      title="Header Data"
      size="middle"
      layout="vertical"
      bordered
      extra={<Button type="primary">Refresh</Button>}
    >
      {/* <Descriptions.Item label="Document Number">{props.data.document_number}</Descriptions.Item> */}
      <Descriptions.Item label="ID Natura">{props.data.id_natura}</Descriptions.Item>
      <Descriptions.Item label="Unit">{props.data.unit_name}</Descriptions.Item>
      <Descriptions.Item label="Cabang">{props.data.branch_name}</Descriptions.Item>
      <Descriptions.Item label="Trx Date">{props.data.trx_date}</Descriptions.Item>
      {props.data.account ? (
        <Descriptions.Item label="Account">{props.data.account}</Descriptions.Item>
      ) : null}
      <Descriptions.Item label="Total">
        Rp. {String(props.data.amount).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default HeaderAPIDesc;
