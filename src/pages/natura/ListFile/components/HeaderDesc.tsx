import { Button, Descriptions } from 'antd';

type HeaderDescProps = {
  visible: boolean;
  data: API.TampFileHeader;
};

const HeaderDesc: React.FC<HeaderDescProps> = (props: HeaderDescProps) => {
  return (
    <Descriptions
      title="Header Data"
      size="middle"
      layout="vertical"
      bordered
      extra={<Button type="primary">Refresh</Button>}
    >
      {/* <Descriptions.Item label="Document Number">{props.data.document_number}</Descriptions.Item> */}
      <Descriptions.Item label="File Name">{props.data.nama_file}</Descriptions.Item>
      {props.data.unit_name ? (
        <Descriptions.Item label="Unit">{props.data.unit_name}</Descriptions.Item>
      ) : props.data.unit_code ? (
        <Descriptions.Item label="Unit">{props.data.unit_code}</Descriptions.Item>
      ) : null}
      {props.data.branch_name ? (
        <Descriptions.Item label="Cabang">{props.data.branch_name}</Descriptions.Item>
      ) : props.data.branch_code ? (
        <Descriptions.Item label="Cabang">{props.data.branch_code}</Descriptions.Item>
      ) : null}
      {props.data.program ? (
        <Descriptions.Item label="Program">{props.data.program}</Descriptions.Item>
      ) : null}
      {props.data.total_line ? (
        <Descriptions.Item label="Total Lines">
          {String(props.data.total_line).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Descriptions.Item>
      ) : null}
    </Descriptions>
  );
};

export default HeaderDesc;
