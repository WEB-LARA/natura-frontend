import { PageContainer } from '@ant-design/pro-components';
import React, { useRef, useReducer } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Space, Tag, message } from 'antd';
import SourceModal from './components/SaveForm';
import { AddButton, EditIconButton, DelIconButton } from '@/components/Button';
import { delSource, fetchSource } from '@/services/master/source';

enum ActionTypeEnum {
  ADD,
  EDIT,
  CANCEL,
}

interface Action {
  type: ActionTypeEnum;
  payload?: API.Source;
}

interface State {
  visible: boolean;
  title: string;
  id?: string;
}

const Msource: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const addTitle = 'Add Source';
  const editTitle = 'Edit Source';
  const delTip = 'Delete Source';

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

  const columns: ProColumns<API.Source>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      ellipsis: true,
      width: 160,
      key: 'name', // Query field name
      sorter: true,
    },
    {
      title: 'Generate ID Natura',
      dataIndex: 'gen_id_natura',
      width: 130,
      search: false,
      render: (_, record) => {
        const status = record.gen_id_natura;
        return <Tag color={status ? 'success' : 'error'}>{status ? 'enabled' : 'disabled'}</Tag>;
      },
    },
    {
      title: 'Active',
      dataIndex: 'flag_active',
      width: 130,
      search: false,
      render: (_, record) => {
        const status = record.flag_active;
        return <Tag color={status ? 'success' : 'error'}>{status ? 'enabled' : 'disabled'}</Tag>;
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
              const res = await delSource(record.id!);
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
      <ProTable<API.Source, API.PaginationParam>
        headerTitle="Master Source"
        columns={columns}
        actionRef={actionRef}
        //request={fetchSource}
        request={(params, sort, filter) => {
          return fetchSource({ ...params, sort, filter });
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
        ]}
      />
      <SourceModal
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

export default Msource;
