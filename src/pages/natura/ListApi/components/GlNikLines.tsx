import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { fetchOracleGlNikLine } from '@/services/oracle/oracleglniklines';

type GlNikLinesProps = {
  idheader: string;
};

const GlNikLines: React.FC<GlNikLinesProps> = (props: GlNikLinesProps) => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.OracleGlNikLine>[] = [
    {
      title: 'Akun',
      dataIndex: 'account',
      ellipsis: true,
      width: 200,
      key: 'account',
      editable: false,
    },
    {
      title: 'NIK',
      dataIndex: 'nik',
      ellipsis: true,
      width: 130,
      key: 'nik',
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
      <ProTable<API.OracleGlNikLine, API.PaginationParam>
        columns={columns}
        actionRef={actionRef}
        params={{ oracle_gl_nik_id: props.idheader }}
        request={fetchOracleGlNikLine}
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

export default GlNikLines;
