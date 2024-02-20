import React, { useRef, useReducer } from 'react';
import { Space, Tag } from 'antd';
import { fetchNaturaHeader } from '@/services/natura/naturaheader';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import type { StatusCase } from '@/utils/util';
import { codeToStatusCase } from '@/utils/util';
import { DetailIconShowButton } from '@/components/Button';
import NaturaDetailsDrawer from '../../Natura/components/DetailDrawer';

type ListNaturasProps = {
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

const ListNaturas: React.FC<ListNaturasProps> = (props: ListNaturasProps) => {
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
      title: 'Periode',
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
          <DetailIconShowButton
            key="Detail"
            code="detail"
            onClick={async () => {
              dispatch({ type: ActionTypeEnum.EDIT, payload: record });
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
        params={{ period: props.period, status: 2 }}
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
      <NaturaDetailsDrawer
        visible={state.visible}
        title={state.title}
        id={state.id == null ? '' : state.id}
        onCancel={() => {
          dispatch({ type: ActionTypeEnum.CANCEL });
        }}
      />
    </>
  );
};

export default ListNaturas;
