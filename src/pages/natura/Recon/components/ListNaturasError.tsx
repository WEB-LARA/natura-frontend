import React, { useRef, useReducer } from 'react';
import { Space, Tag, message } from 'antd';
import { delNaturaHeader, fetchNaturaHeader } from '@/services/natura/naturaheader';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import type { StatusCase } from '@/utils/util';
import { codeToStatusCase } from '@/utils/util';
import { DelIconButton, EditIconButton } from '@/components/Button';
import ReconModal from './EditForm';

type ListNaturasErrorProps = {
  period: string;
};

enum ActionTypeEnum {
  EDIT,
  CANCEL,
}

interface Action {
  type: ActionTypeEnum;
  payload?: API.NaturaHeader;
}

interface State {
  visible: boolean;
  title: string;
  id?: string;
}

const ListNaturasError: React.FC<ListNaturasErrorProps> = (props: ListNaturasErrorProps) => {
  const actionRef = useRef<ActionType>();

  const [state, dispatch] = useReducer(
    (pre: State, action: Action) => {
      switch (action.type) {
        case ActionTypeEnum.EDIT:
          return {
            visible: true,
            title: 'Edit Natura',
            id: action.payload?.id,
          };
        case ActionTypeEnum.CANCEL:
          return {
            visible: false,
            title: '',
            id: '',
          };
        default:
          return pre;
      }
    },
    { visible: false, title: '', id: '' },
  );

  const columns: ProColumns<API.NaturaHeader>[] = [
    {
      title: 'ID Natura',
      dataIndex: 'id_natura',
      ellipsis: true,
      width: 160,
      key: 'id_natura',
    },
    {
      title: 'Period',
      dataIndex: 'period',
      ellipsis: true,
      width: 160,
      key: 'period',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 130,
      search: false,
      render: (_, record) => {
        const status = record.status;
        const stt: StatusCase = codeToStatusCase(status);
        return <Tag color={stt.color}>{stt.tulis}</Tag>;
      },
    },
    {
      title: 'Actions',
      valueType: 'option',
      key: 'option',
      width: 130,
      render: (_, record) => (
        <Space size={2}>
          <EditIconButton
            key="edit"
            code="edit"
            onClick={() => {
              dispatch({ type: ActionTypeEnum.EDIT, payload: record });
            }}
          />
          <DelIconButton
            key="delete"
            code="delete"
            title="Delete"
            onConfirm={async () => {
              const res = await delNaturaHeader(record.id!);
              if (res.success) {
                message.success('Delete successfully');
                actionRef.current?.reload();
              }
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable<API.NaturaHeader, API.PaginationParam>
        columns={columns}
        actionRef={actionRef}
        params={{ period: props.period, status: 101 }}
        request={fetchNaturaHeader}
        rowKey="id"
        cardBordered
        search={{
          labelWidth: 'auto',
        }}
        pagination={{ pageSize: 10, showSizeChanger: true }}
        options={{
          density: true,
          fullScreen: true,
          reload: true,
        }}
        dateFormatter="string"
      />
      <ReconModal
        visible={state.visible}
        title={state.title}
        id={state.id!}
        onCancel={() => {
          dispatch({ type: ActionTypeEnum.CANCEL });
        }}
        onSuccess={() => {
          dispatch({ type: ActionTypeEnum.CANCEL });
          actionRef.current?.reload();
        }}
      />
    </>
  );
};

export default ListNaturasError;
