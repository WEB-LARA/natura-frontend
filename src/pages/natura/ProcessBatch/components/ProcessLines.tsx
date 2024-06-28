import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { fetchNaturaProcessLine } from '@/services/natura/processedline';
import { Space, Tag } from 'antd';

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
      title: 'Account Description',
      dataIndex: 'akun.description',
      ellipsis: true,
      width: 160,
      render: (_, record) => {
        return record.akun ? <Space>{record.akun?.description}</Space> : '-';
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      ellipsis: true,
      width: 130,
      key: 'amount',
      valueType: 'digit',
    },
    {
      title: 'Amount Final (PPh 21)',
      dataIndex: 'amount_final',
      ellipsis: true,
      width: 130,
      key: 'amount_final',
      valueType: 'digit',
    },
    {
      title: 'Object Pajak',
      dataIndex: 'flag_tax_object',
      width: 100,
      search: false,
      render: (_, record) => {
        const status = record.flag_tax_object;
        return <Tag color={status ? 'success' : 'error'}>{status ? 'yes' : 'no'}</Tag>;
      },
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
