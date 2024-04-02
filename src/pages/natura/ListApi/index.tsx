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
import StatisticAPI from './components/StatisticAPI';
import TampFileHeaderModal from './components/SaveForm';
import { delOracleAp, fetchOracleAp } from '@/services/oracle/oracleap';
import { fetchOracleGl } from '@/services/oracle/oraclegl';
import { fetchOracleGlNik } from '@/services/oracle/oracleglnik';
import { fetchCarsApiHeader } from '@/services/natura/naturaapi';

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

  const columnAps: ProColumns<API.OracleAp>[] = [
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
              const res = await delOracleAp(record.id!);
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

  const columnGls: ProColumns<API.OracleGl>[] = [
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
              const res = await delOracleAp(record.id!);
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

  const columnGlniks: ProColumns<API.OracleGlNik>[] = [
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
      dataIndex: 'unit_code',
      ellipsis: true,
      width: 160,
      key: 'unit_code',
    },
    {
      title: 'Branch',
      dataIndex: 'branch_code',
      ellipsis: true,
      width: 160,
      key: 'branch_code',
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
              const res = await delOracleAp(record.id!);
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

  const columnCars: ProColumns<API.CarsHeader>[] = [
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
      dataIndex: 'document_number',
      ellipsis: true,
      width: 160,
      key: 'document_number',
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
              const res = await delOracleAp(record.id!);
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
          <Tabs.TabPane tab="Oracle AP" key="item-1">
            <ProTable<API.OracleAp, API.PaginationParam>
              columns={columnAps}
              actionRef={actionRef}
              request={fetchOracleAp}
              rowKey="id"
              cardBordered
              search={{
                labelWidth: 'auto',
              }}
              pagination={{ pageSize: 10, showSizeChanger: true }}
              scroll={{ x: 1000 }}
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
          <Tabs.TabPane tab="Oracle GL" key="item-2">
            <ProTable<API.OracleGl, API.PaginationParam>
              columns={columnGls}
              actionRef={actionRef}
              request={fetchOracleGl}
              rowKey="id"
              cardBordered
              search={{
                labelWidth: 'auto',
              }}
              pagination={{ pageSize: 10, showSizeChanger: true }}
              scroll={{ x: 1000 }}
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
          <Tabs.TabPane tab="Oracle GL Nik" key="item-3">
            <ProTable<API.OracleGlNik, API.PaginationParam>
              columns={columnGlniks}
              actionRef={actionRef}
              request={fetchOracleGlNik}
              rowKey="id"
              cardBordered
              search={{
                labelWidth: 'auto',
              }}
              pagination={{ pageSize: 10, showSizeChanger: true }}
              scroll={{ x: 1000 }}
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
          <Tabs.TabPane tab="Cars" key="item-4">
            <ProTable<API.CarsHeader, API.PaginationParam>
              columns={columnCars}
              actionRef={actionRef}
              request={fetchCarsApiHeader}
              rowKey="id"
              cardBordered
              search={{
                labelWidth: 'auto',
              }}
              pagination={{ pageSize: 10, showSizeChanger: true }}
              scroll={{ x: 1000 }}
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
        </Tabs>
      </PageContainer>
    </>
  );
};

export default ListApi;
