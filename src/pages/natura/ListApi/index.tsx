import { PageContainer } from '@ant-design/pro-components';
import React, { useRef, useReducer } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, PageHeader, Space, Tabs, Tag, message } from 'antd';
import { EditIconButton, DelIconButton } from '@/components/Button';
import type { StatusCase } from '@/utils/util';
import { codeToStatusCase } from '@/utils/util';
import { PlusOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { delCarsApiHeader, fetchCarsApiHeader } from '@/services/natura/naturaapi';
import StatisticAPI from './components/StatisticAPI';
import TampFileHeaderModal from './components/SaveForm';

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

const ListApi: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const addTitle = 'Add Natura API';
  const editTitle = 'Edit Natura API';
  const delTip = 'Delete Natura API';

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

  const columns: ProColumns<API.CarsHeader>[] = [
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
      title: 'Document Number',
      dataIndex: 'document_num',
      ellipsis: true,
      width: 160,
      key: 'document_num',
    },
    {
      title: 'Id Natura',
      dataIndex: 'id_natura',
      ellipsis: true,
      width: 160,
      key: 'id_natura',
    },
    {
      title: 'Trx Date',
      dataIndex: 'trx_date',
      ellipsis: true,
      width: 160,
      key: 'trx_date',
    },
    {
      title: 'Unit',
      dataIndex: 'unit_name',
      ellipsis: true,
      width: 160,
      key: 'unit_name',
    },
    {
      title: 'Branch',
      dataIndex: 'branch_name',
      ellipsis: true,
      width: 160,
      key: 'branch_name',
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
              const res = await delCarsApiHeader(record.id!);
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
      <PageContainer>
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title="Natura List API"
            subTitle="This is a subtitle"
            extra={[
              <Button
                key="1"
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => history.push(`/natura/naturaadd`)}
              >
                Process Validate API
              </Button>,
            ]}
          >
            <StatisticAPI />
          </PageHeader>
        </div>

        <Tabs>
          <Tabs.TabPane tab="Oracle" key="item-1">
            <ProTable<API.CarsHeader, API.PaginationParam>
              columns={columns}
              actionRef={actionRef}
              request={fetchCarsApiHeader}
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
            <TampFileHeaderModal
              visible={state.visible}
              title={state.title}
              id={state.id == null ? '' : state.id}
              onCancel={() => {
                dispatch({ type: ActionTypeEnum.CANCEL });
              }}
              onSuccess={() => {
                dispatch({ type: ActionTypeEnum.CANCEL });
                actionRef.current?.reload();
              }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="GL" key="item-2">
            Content 2
          </Tabs.TabPane>
          <Tabs.TabPane tab="Cars" key="item-3">
            Content 3
          </Tabs.TabPane>
        </Tabs>
      </PageContainer>
    </>
  );
};

export default ListApi;
