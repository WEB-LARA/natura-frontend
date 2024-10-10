import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { fetchTampFileLine } from '@/services/natura/tampfileline';

type ListLinesProps = {
  idheader: string;
};

const ListLines: React.FC<ListLinesProps> = (props: ListLinesProps) => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.TampFileLine>[] = [
    {
      title: 'Line csv',
      dataIndex: 'line_csv',
      ellipsis: true,
      width: 50,
      key: 'line_csv',
      editable: false,
    },
    {
      title: 'ID Natura',
      dataIndex: 'id_natura',
      ellipsis: true,
      width: 130,
      key: 'id_natura',
      editable: false,
    },
    {
      title: 'Nik',
      dataIndex: 'nik',
      ellipsis: true,
      width: 130,
      key: 'nik',
      editable: false,
    },
    {
      title: 'Account',
      dataIndex: 'account',
      ellipsis: true,
      width: 130,
      key: 'account',
      editable: false,
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
    <>
      <ProTable<API.TampFileLine, API.PaginationParam>
        columns={columns}
        actionRef={actionRef}
        params={{ tamp_file_header_id: props.idheader }}
        request={fetchTampFileLine}
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

export default ListLines;
