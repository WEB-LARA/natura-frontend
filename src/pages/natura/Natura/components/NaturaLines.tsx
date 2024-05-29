import React, { useRef } from 'react';
import { Space } from 'antd';
import { fetchNaturaLine } from '@/services/natura/naturaline';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

type ListNaturaLinesProps = {
  idheader: string;
};

const NaturaLines: React.FC<ListNaturaLinesProps> = (props: ListNaturaLinesProps) => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.NaturaLine>[] = [
    {
      title: 'Akun',
      dataIndex: 'akun.description',
      ellipsis: true,
      width: 200,
      key: 'akun_id',
      editable: false,
      render: (_, record) => {
        return record.akun ? <Space>{record.akun?.description}</Space> : '-';
      },
    },
    {
      title: 'NIK',
      dataIndex: 'nik_num',
      ellipsis: true,
      width: 130,
      key: 'nik_num',
      editable: false,
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
      title: 'Amount Final',
      dataIndex: 'amount_final',
      ellipsis: true,
      width: 130,
      key: 'amount_final',
      valueType: 'digit',
    },
  ];

  return (
    <>
      <ProTable<API.NaturaLine, API.PaginationParam>
        columns={columns}
        actionRef={actionRef}
        params={{ natura_header_id: props.idheader }}
        request={fetchNaturaLine}
        rowKey="id"
        cardBordered
        search={{
          labelWidth: 'auto',
        }}
        pagination={{ pageSize: 100, showSizeChanger: true }}
        options={{
          density: true,
          fullScreen: true,
          reload: true,
        }}
      />
    </>
  );
};

export default NaturaLines;
