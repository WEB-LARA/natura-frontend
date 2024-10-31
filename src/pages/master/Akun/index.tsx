import { PageContainer } from '@ant-design/pro-components';
import React, { useRef, useReducer } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Space, Tag, message } from 'antd';
import { fetchAkun, delAkun } from '@/services/master/akun';
import AkunModal from './components/SaveForm';
import { AddButton, EditIconButton, DelIconButton } from '@/components/Button';

enum ActionTypeEnum {
  ADD,
  EDIT,
  CANCEL,
}

interface Action {
  type: ActionTypeEnum;
  payload?: API.Akun;
}

interface State {
  visible: boolean;
  title: string;
  id?: string;
}

const Akun: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const addTitle = 'Add Akun';
  const editTitle = 'Edit Akun';
  const delTip = 'Delete Akun';

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

  const columns: ProColumns<API.Akun>[] = [
    {
      title: 'Kelompok',
      dataIndex: 'kelompok.name',
      width: 160,
      search: false,
      render: (_, record) => {
        return record.kelompok ? <Space>{record.kelompok?.name}</Space> : '-';
      },
    },
    {
      title: 'Account',
      dataIndex: 'account',
      width: 130,
      key: 'account', // Query field name
      sorter: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      ellipsis: true,
      width: 160,
      key: 'description', // Query field name
      sorter: true,
    },
    {
      title: 'Active',
      dataIndex: 'flag_active',
      width: 130,
      search: false,
      render: (_, record) => {
        const status = record.flag_active;
        return (
          <Tag color={status === true ? 'success' : 'error'}>
            {status === true ? 'enabled' : 'disabled'}
          </Tag>
        );
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
            title={delTip}
            onConfirm={async () => {
              const res = await delAkun(record.id!);
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
      <ProTable<API.Akun, API.PaginationParam>
        headerTitle="Master Akun"
        columns={columns}
        actionRef={actionRef}
        //request={fetchAkun}
        request={(params, sort, filter) => {
          return fetchAkun({ ...params, sort, filter });
        }}
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
        scroll={{ x: 1000 }}
        dateFormatter="string"
        toolBarRender={() => [
          <AddButton
            key="add"
            code="add"
            onClick={() => {
              dispatch({ type: ActionTypeEnum.ADD });
            }}
          />,
        ]}
      />
      <AkunModal
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

export default Akun;
