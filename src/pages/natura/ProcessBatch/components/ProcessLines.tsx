import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { fetchNaturaProcessLine } from '@/services/natura/processedline';

type ProcessLinesProps = {
  idheader: string;
};

const ProcessLines: React.FC<ProcessLinesProps> = (props: ProcessLinesProps) => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.NaturaProcessLine>[] = [
    {
      title: 'Account',
      dataIndex: 'account',
      ellipsis: true,
      width: 100,
      key: 'account',
    },
    {
      title: 'Account Name',
      dataIndex: 'account_name',
      ellipsis: true,
      width: 160,
      key: 'account_name',
    },
    {
      title: 'amount',
      dataIndex: 'amount',
      ellipsis: true,
      width: 130,
      key: 'amount',
      valueType: 'digit',
    },
  ];

  return (
    <ProTable<API.NaturaProcessLine, API.PaginationParam>
      columns={columns}
      actionRef={actionRef}
      params={{ natura_process_header_id: props.idheader }}
      request={fetchNaturaProcessLine}
      rowKey="id"
      cardBordered
      search={false}
      pagination={{ pageSize: 100, showSizeChanger: true }}
      options={{
        density: true,
        fullScreen: true,
        reload: true,
      }}
    />
  );
};

export default ProcessLines;
