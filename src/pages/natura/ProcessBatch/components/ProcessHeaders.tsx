import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { fetchNaturaProcessHeader } from '@/services/natura/processedheader';
import ProcessLines from './ProcessLines';

type ProcessHeadersProps = {
  idheader: string;
};

const ProcessHeaders: React.FC<ProcessHeadersProps> = (props: ProcessHeadersProps) => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.NaturaProcessHeader>[] = [
    {
      title: 'Nik',
      dataIndex: 'nik',
      ellipsis: true,
      width: 160,
      key: 'nik',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      ellipsis: true,
      width: 160,
      key: 'name',
    },
    {
      title: 'amount',
      dataIndex: 'total_amount',
      ellipsis: true,
      width: 130,
      key: 'total_amount',
      valueType: 'digit',
    },
  ];

  return (
    <ProTable<API.NaturaProcessHeader, API.PaginationParam>
      columns={columns}
      actionRef={actionRef}
      params={{ natura_process_batch_id: props.idheader }}
      request={fetchNaturaProcessHeader}
      expandable={{
        expandedRowRender: (record) => <ProcessLines idheader={record.id!} />,
        rowExpandable: (record) => record.name !== 'Not Expandable',
      }}
      rowKey="id"
      cardBordered
      search={{
        labelWidth: 'auto',
      }}
      pagination={{ pageSize: 20, showSizeChanger: true }}
      options={{
        density: true,
        fullScreen: true,
        reload: true,
      }}
    />
  );
};

export default ProcessHeaders;
