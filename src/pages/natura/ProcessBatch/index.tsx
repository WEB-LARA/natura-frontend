import { PageContainer } from '@ant-design/pro-components';
import React, { useRef, useReducer } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, PageHeader, Space, message } from 'antd';
import { DelIconButton, DetailIconShowButton } from '@/components/Button';
import { PlusOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { delNaturaProcessBatch, fetchNaturaProcessBatch } from '@/services/natura/processedbatch';
import ProcessDetailsDrawer from './components/DetailDrawer';

enum ActionTypeEnum {
  ADD,
  EDIT,
  CANCEL,
}

interface Action {
  type: ActionTypeEnum;
  payload?: API.CarsHeader;
}

interface State {
  visible: boolean;
  title: string;
  id?: string;
}

const ProcessBatch: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const addTitle = 'Add Natura Batch';
  const editTitle = 'Detail Natura Batch';
  const delTip = 'Delete Natura Batch';

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

  const columns: ProColumns<API.NaturaProcessBatch>[] = [
    {
      title: 'Status',
      dataIndex: 'status',
      width: 130,
      filters: true,
      onFilter: true,
      valueEnum: {
        0: { text: 'New', status: 'Default' },
        1: { text: 'Process', status: 'Processing' },
        3: { text: 'Finished', status: 'Success' },
        100: { text: 'Error', status: 'Error' },
      },
    },
    {
      title: 'Batch Number',
      dataIndex: 'batch_number',
      ellipsis: true,
      width: 160,
      key: 'batch_number',
      sorter: (a, b) => a.batch_number!.localeCompare(b.batch_number!),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Month Period',
      dataIndex: 'month_period',
      ellipsis: true,
      width: 100,
      key: 'month_period',
    },
    {
      title: 'Year Period',
      dataIndex: 'year_period',
      ellipsis: true,
      width: 100,
      key: 'year_period',
    },
    {
      title: 'Actions',
      valueType: 'option',
      key: 'option',
      width: 130,
      render: (_, record) => (
        <Space size={2}>
          <DelIconButton
            key="Delete"
            code="delete"
            title={delTip}
            onConfirm={async () => {
              const res = await delNaturaProcessBatch(record.id!);
              if (res.success) {
                message.success('Delete successfully');
                actionRef.current?.reload();
              }
            }}
          />
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
    <PageContainer>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title="Natura List Process"
          subTitle="List Natura Process berisi semua batch yang telah di-Process"
          extra={[
            <Button
              key="1"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => history.push(`/natura/naturaprocessadd`)}
            >
              Process Data
            </Button>,
          ]}
        />
      </div>

      <ProTable<API.NaturaProcessBatch, API.PaginationParam>
        columns={columns}
        actionRef={actionRef}
        request={(params, sorter, filter) => {
          // console.log(sorter == null ? '' : Object.keys(sorter));
          return fetchNaturaProcessBatch({ ...params, sorter, filter });
        }}
        //request={fetchNaturaProcessBatch}
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

      <ProcessDetailsDrawer
        visible={state.visible}
        title={state.title}
        id={state.id == null ? '' : state.id}
        onCancel={() => {
          dispatch({ type: ActionTypeEnum.CANCEL });
        }}
      />
    </PageContainer>
  );
};

export default ProcessBatch;
