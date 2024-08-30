import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { fetchCarsApiLine } from '@/services/natura/naturaapi';

type CarsLinesProps = {
  idheader: string;
};

const CarsLines: React.FC<CarsLinesProps> = (props: CarsLinesProps) => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.CarsLine>[] = [
    {
      title: 'NIK',
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
      title: 'Description',
      dataIndex: 'description',
      ellipsis: true,
      width: 130,
      key: 'description',
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
      <ProTable<API.CarsLine, API.PaginationParam>
        columns={columns}
        actionRef={actionRef}
        params={{ cars_header_id: props.idheader }}
        request={fetchCarsApiLine}
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

export default CarsLines;
