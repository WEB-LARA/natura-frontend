import { PageContainer } from '@ant-design/pro-components';
import React, { useRef, useReducer } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, PageHeader, Space, Tag, message } from 'antd';
import { fetchNaturaHeader, delNaturaHeader } from '@/services/natura/naturaheader';
import NaturaHeaderModal from './components/SaveForm';
import { AddButton, EditIconButton, DelIconButton } from '@/components/Button';
import type { StatusCase } from '@/utils/util';
import { codeToStatusCase } from '@/utils/util';
import { PlusOutlined } from '@ant-design/icons';
import { history } from 'umi';

enum ActionTypeEnum {
  ADD,
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

const NaturaHeader: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const addTitle = 'Add Natura';
  const editTitle = 'Edit Natura';
  const delTip = 'Delete Natura';

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
      title: 'Total',
      dataIndex: 'total',
      ellipsis: true,
      width: 160,
      key: 'total',
      render: (_, record) => `${record.total}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
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
              history.push(`/natura/naturaadd/${record.id}`);
              // dispatch({ type: ActionTypeEnum.EDIT, payload: record });
            }}
          />
          <DelIconButton
            key="delete"
            code="delete"
            title={delTip}
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
    <PageContainer>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title="Natura List"
          subTitle="This is a subtitle"
          extra={[
            <Button key="3">List API</Button>,
            <Button key="2">List Upload</Button>,
            <Button
              key="1"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => history.push(`/natura/naturaadd`)}
            >
              Add
            </Button>,
          ]}
        />
      </div>

      <ProTable<API.NaturaHeader, API.PaginationParam>
        columns={columns}
        actionRef={actionRef}
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
      <NaturaHeaderModal
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

export default NaturaHeader;
