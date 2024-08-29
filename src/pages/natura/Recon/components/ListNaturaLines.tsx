import React, { useRef, useState } from 'react';
import { Space } from 'antd';
import { fetchNaturaLine, updateNaturaLine } from '@/services/natura/naturaline';
import type { ProColumns, ActionType, EditableFormInstance } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';

type ListNaturaLinesProps = {
  idheader: string;
};

const ListNaturaLines: React.FC<ListNaturaLinesProps> = (props: ListNaturaLinesProps) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => []);
  const actionRef = useRef<ActionType>();
  const editableFormRef = useRef<EditableFormInstance>();

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
      dataIndex: 'nik_id',
      ellipsis: true,
      width: 130,
      key: 'nik_id',
      editable: false,
      render: (_, record) => {
        return record.nik ? <Space>{record.nik?.nik}</Space> : '-';
      },
    },
    {
      title: 'amount',
      dataIndex: 'amount',
      ellipsis: true,
      width: 130,
      key: 'amount',
      valueType: 'digit',
    },
    {
      title: 'Action',
      valueType: 'option',
      width: 100,
      render: (_, row) => [
        <a
          key="edit"
          onClick={async () => {
            actionRef.current?.startEditable(row.id!);
          }}
        >
          Edit
        </a>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<API.NaturaLine, API.PaginationParam>
        columns={columns}
        actionRef={actionRef}
        editableFormRef={editableFormRef}
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
        recordCreatorProps={{
          record: {},
          style: {
            display: 'none',
          },
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          onChange: setEditableRowKeys,
          onSave: async (record, recordList) => {
            console.log(recordList);
            await updateNaturaLine(recordList.id!, { amount: recordList.amount });
          },
          // onValuesChange: (record, recordList) => {
          //   console.log(recordList);
          // },
          actionRender: (row, config, dom) => [dom.save, dom.cancel],
        }}
      />
    </>
  );
};

export default ListNaturaLines;
