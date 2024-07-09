import React, { useRef } from 'react';
import { Space, Tag } from 'antd';
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
      dataIndex: 'akun_acc',
      ellipsis: true,
      width: 130,
      key: 'akun_acc',
      editable: false,
    },
    {
      title: 'Akun Name',
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
      title: 'Name',
      dataIndex: 'nik.name',
      ellipsis: true,
      width: 130,
      key: 'nik.name',
      editable: false,
      render: (_, record) => {
        return record.nik ? <Space>{record.nik?.name}</Space> : '-';
      },
    },
    {
      title: 'Bagian',
      dataIndex: 'nik.bagian_name',
      ellipsis: true,
      width: 130,
      key: 'nik.bagian_name',
      editable: false,
      render: (_, record) => {
        return record.nik ? <Space>{record.nik?.bagian_name}</Space> : '-';
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
      title: 'Amount Final',
      dataIndex: 'amount_final',
      ellipsis: true,
      width: 130,
      key: 'amount_final',
      valueType: 'digit',
    },
    {
      title: 'Tax Object',
      dataIndex: 'akun.tax_object',
      width: 100,
      search: false,
      render: (_, record) => {
        const status = record.akun?.tax_object;
        return <Tag color={status ? 'success' : 'error'}>{status ? 'yes' : 'no'}</Tag>;
      },
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
        tableLayout="auto"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{ pageSize: 100, showSizeChanger: true }}
        scroll={{ x: 'max-content' }}
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
