import React, { useRef } from 'react';
import { Space } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { fetchNaturaHeader } from '@/services/natura/naturaheader';
import { SelectIconShowButton } from '@/components/Button';

type NaturaHeaderSelectProps = {
  onSelect: (id_natura: string) => void;
};

const NaturaHeaders: React.FC<NaturaHeaderSelectProps> = (props: NaturaHeaderSelectProps) => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.NaturaHeader>[] = [
    {
      title: 'ID Natura',
      dataIndex: 'id_natura',
      ellipsis: true,
      width: 160,
      key: 'id_natura',
    },
    {
      title: 'Period',
      dataIndex: 'period',
      ellipsis: true,
      width: 160,
      key: 'period',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      ellipsis: true,
      width: 160,
      key: 'total',
      render: (_, record) => `${record.total}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    },
    {
      title: 'Actions',
      valueType: 'option',
      key: 'option',
      width: 130,
      render: (_, record) => (
        <Space size={2}>
          <SelectIconShowButton
            key="select"
            code="select"
            onClick={() => {
              props.onSelect(record.id_natura!);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable<API.NaturaLine, API.PaginationParam>
        columns={columns}
        actionRef={actionRef}
        request={fetchNaturaHeader}
        rowKey="id"
        cardBordered
        search={{
          labelWidth: 'auto',
        }}
        pagination={{ pageSize: 10, showSizeChanger: true }}
        options={{
          density: true,
          fullScreen: true,
          reload: true,
        }}
      />
    </>
  );
};

export default NaturaHeaders;
