import { PageContainer } from '@ant-design/pro-components';
import React, { useRef, useReducer } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, PageHeader, Space, Tag, message } from 'antd';
import { DelIconButton, ProcessButton } from '@/components/Button';
import type { StatusCase } from '@/utils/util';
import { codeToStatusCase } from '@/utils/util';
import { PlusOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { delTampFileHeader, fetchTampFileHeader } from '@/services/natura/naturafile';

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

const ListFile: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const addTitle = 'Add Natura File';
  const editTitle = 'Edit Natura File';
  const delTip = 'Delete Natura File';

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

  const columns: ProColumns<API.TampFileHeader>[] = [
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
      title: 'File Name',
      dataIndex: 'nama_file',
      ellipsis: true,
      width: 160,
      key: 'nama_file',
      sorter: true,
    },
    {
      title: 'Program',
      dataIndex: 'program',
      ellipsis: true,
      width: 100,
      key: 'program',
    },
    {
      title: 'Total Line',
      dataIndex: 'total_line',
      ellipsis: true,
      width: 100,
      key: 'total_line',
    },
    {
      title: 'Unit',
      dataIndex: 'unit_name',
      ellipsis: true,
      width: 130,
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
          <ProcessButton
            key="Process"
            code="process"
            onClick={() => {
              // TODO: call api process
              // history.push(`/natura/naturaadd/${record.id}`);
              // dispatch({ type: ActionTypeEnum.EDIT, payload: record });
            }}
          />
          <DelIconButton
            key="Delete"
            code="delete"
            title={delTip}
            onConfirm={async () => {
              const res = await delTampFileHeader(record.id!);
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
          title="Natura List File"
          subTitle="List Natura File berisi semua file yang telah di-Upload"
          extra={[
            <Button
              key="1"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => history.push(`/natura/upload`)}
            >
              Upload Templete
            </Button>,
          ]}
        />
      </div>

      <ProTable<API.TampFileHeader, API.PaginationParam>
        columns={columns}
        actionRef={actionRef}
        request={(params, sorter, filter) => {
          // console.log(sorter == null ? '' : Object.keys(sorter));
          return fetchTampFileHeader({ ...params, sorter, filter });
        }}
        //request={fetchTampFileHeader}
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
    </PageContainer>
  );
};

export default ListFile;
