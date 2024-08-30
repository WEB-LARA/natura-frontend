import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

type ErrLinesProps = {
  idheader: string;
  getfetch: (params?: any, options?: any) => any;
};

const ErrLines: React.FC<ErrLinesProps> = (props: ErrLinesProps) => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.ErrLine>[] = [
    {
      title: 'Description',
      dataIndex: 'description',
      ellipsis: false,
      width: 130,
      key: 'description',
      editable: false,
    },
  ];

  return (
    <>
      <ProTable<API.ErrLine, API.PaginationParam>
        columns={columns}
        actionRef={actionRef}
        params={{ header_id: props.idheader }}
        request={props.getfetch}
        rowKey="id"
        cardBordered
        pagination={{ pageSize: 100, showSizeChanger: true }}
        options={{
          density: true,
          fullScreen: false,
          reload: true,
        }}
      />
    </>
  );
};

export default ErrLines;
