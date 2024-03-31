import { PageContainer } from '@ant-design/pro-components';
import React, { useRef, useReducer } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Space, Tag, message } from 'antd';
import { fetchUnit, delUnit } from '@/services/master/unit';
import UnitModal from './components/SaveForm';
import { AddButton, EditIconButton, DelIconButton } from '@/components/Button';

enum ActionTypeEnum {
  ADD,
  EDIT,
  CANCEL,
}

interface Action {
  type: ActionTypeEnum;
  payload?: API.Unit;
}

interface State {
  visible: boolean;
  title: string;
  id?: string;
}

const Unit: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const addTitle = 'Add Unit';
  const editTitle = 'Edit Unit';
  const delTip = 'Delete Unit';

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

  const columns: ProColumns<API.Unit>[] = [
    {
      title: 'Kode Unit',
      dataIndex: 'code',
      width: 130,
      key: 'code', // Query field name
    },
    {
      title: 'Kode Inisial',
      dataIndex: 'reference_id',
      width: 130,
      key: 'reference_id', // Query field name
    },
    {
      title: 'Name',
      dataIndex: 'name',
      ellipsis: true,
      width: 160,
      key: 'name', // Query field name
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
              const res = await delUnit(record.id!);
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
      <ProTable<API.Unit, API.PaginationParam>
        headerTitle="Master Unit"
        columns={columns}
        actionRef={actionRef}
        request={fetchUnit}
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
      <UnitModal
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

export default Unit;
