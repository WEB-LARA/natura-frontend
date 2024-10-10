import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { fetchOracleGlLine } from '@/services/oracle/oraclegllines';

type GlLinesProps = {
  idheader: string;
};

const GlLines: React.FC<GlLinesProps> = (props: GlLinesProps) => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.OracleGlLine>[] = [
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
      <ProTable<API.OracleGlLine, API.PaginationParam>
        columns={columns}
        actionRef={actionRef}
        params={{ oracle_gl_id: props.idheader }}
        request={fetchOracleGlLine}
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

export default GlLines;
