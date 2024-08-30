import { PageContainer } from '@ant-design/pro-components';
import React, { useRef, useReducer } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Space, message } from 'antd';
import WilayahModal from './components/SaveForm';
import { AddButton, EditIconButton, DelIconButton, SyncButton } from '@/components/Button';
import { delWilayah, fetchWilayah, syncWilayah } from '@/services/master/wilayah';

enum ActionTypeEnum {
  ADD,
  EDIT,
  CANCEL,
}

interface Action {
  type: ActionTypeEnum;
  payload?: API.Wilayah;
}

interface State {
  visible: boolean;
  title: string;
  id?: string;
}

const Wilayah: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const addTitle = 'Add Wilayah';
  const editTitle = 'Edit Wilayah';
  const delTip = 'Delete Wilayah';

  const [state, dispatch] = useReducer(
    (pre: State, action: Action) => {
      switch (action.type) {
        case ActionTypeEnum.ADD:
          return {
            visible: true,
            title: addTitle,
          };
        case ActionTypeEnum.EDIT:
          return {
            visible: true,
            title: editTitle,
            id: action.payload?.id,
          };
        case ActionTypeEnum.CANCEL:
          return {
            visible: false,
            title: '',
            id: undefined,
          };
        default:
          return pre;
      }
    },
    { visible: false, title: '' },
  );

  const columns: ProColumns<API.Wilayah>[] = [
    {
      title: 'Kode Wilayah',
      dataIndex: 'code',
      width: 130,
      key: 'code', // Query field name
      sorter: (a, b) => {
        return a.code!.localeCompare(b.code!);
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      ellipsis: true,
      width: 160,
      key: 'name', // Query field name
      sorter: (a, b) => {
        return a.name!.localeCompare(b.name!);
      },
    },
    {
      title: 'Action',
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
            title={delTip}
            onConfirm={async () => {
              const res = await delWilayah(record.id!);
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
    <PageContainer>
      <ProTable<API.Wilayah, API.PaginationParam>
        headerTitle="Master Wilayah"
        columns={columns}
        actionRef={actionRef}
        request={fetchWilayah}
        rowKey="id"
        cardBordered
        search={{
          labelWidth: 'auto',
        }}
        pagination={{ showSizeChanger: true }}
        options={{
          density: true,
          fullScreen: true,
          reload: true,
        }}
        dateFormatter="string"
        scroll={{ x: 1000 }}
        toolBarRender={() => [
          <AddButton
            key="add"
            code="add"
            onClick={() => {
              dispatch({ type: ActionTypeEnum.ADD });
            }}
          />,
          <SyncButton
            key="SyncWilayah"
            code="SyncWilayah"
            onClick={async () => {
              await syncWilayah();

              message.success('Sync Process in background, Please wait in 10 minute');
            }}
          />,
        ]}
      />
      <WilayahModal
        visible={state.visible}
        title={state.title}
        id={state.id}
        onCancel={() => {
          dispatch({ type: ActionTypeEnum.CANCEL });
        }}
        onSuccess={() => {
          dispatch({ type: ActionTypeEnum.CANCEL });
          actionRef.current?.reload();
        }}
      />
    </PageContainer>
  );
};

export default Wilayah;
