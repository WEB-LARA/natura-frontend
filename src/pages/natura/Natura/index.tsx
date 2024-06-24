import { PageContainer } from '@ant-design/pro-components';
import React, { useRef, useReducer, useState, useEffect } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, PageHeader, Space, message } from 'antd';
import { fetchNaturaHeader, delNaturaHeader } from '@/services/natura/naturaheader';
import NaturaHeaderModal from './components/SaveForm';
import { EditIconButton, DelIconButton, DetailIconButton } from '@/components/Button';
import { StatusFilter } from '@/utils/util';
import { PlusOutlined } from '@ant-design/icons';
import { history } from 'umi';
import NaturaDetailsDrawer from './components/DetailDrawer';
import { fetchCabangFilterByCode } from '@/services/master/cabang';

enum ActionTypeEnum {
  ADD,
  EDIT,
  CANCEL,
  DETTAIL,
}

interface Action {
  type: ActionTypeEnum;
  payload?: API.NaturaHeader;
}

interface State {
  visible: boolean;
  visibledetail: boolean;
  title: string;
  id?: string;
}

const NaturaHeader: React.FC = () => {
  const [cabangFilter, setCabangFilter] = useState<API.FilterType>({});
  const actionRef = useRef<ActionType>();
  const addTitle = 'Add Natura';
  const editTitle = 'Edit Natura';
  const delTip = 'Delete Natura';
  const detailTitle = 'Detail Natura';

  useEffect(() => {
    const requestCabang = async () => {
      const res = await fetchCabangFilterByCode();
      if (res) {
        return res;
      } else {
        return {};
      }
    };

    requestCabang().then((data) => {
      setCabangFilter(data);
    });
  }, []);

  const [state, dispatch] = useReducer(
    (pre: State, action: Action) => {
      switch (action.type) {
        case ActionTypeEnum.ADD:
          return {
            visible: true,
            visibledetail: false,
            title: addTitle,
          };
        case ActionTypeEnum.EDIT:
          return {
            visible: true,
            visibledetail: false,
            title: editTitle,
            id: action.payload?.id,
          };
        case ActionTypeEnum.DETTAIL:
          return {
            visible: false,
            visibledetail: true,
            title: detailTitle,
            id: action.payload?.id,
          };
        case ActionTypeEnum.CANCEL:
          return {
            visible: false,
            visibledetail: false,
            title: '',
            id: undefined,
          };
        default:
          return pre;
      }
    },
    { visible: false, visibledetail: false, title: '' },
  );

  const columns: ProColumns<API.NaturaHeader>[] = [
    {
      title: 'Status',
      dataIndex: 'status',
      width: 130,
      valueType: 'select',
      filters: true,
      onFilter: true,
      valueEnum: StatusFilter,
    },
    {
      title: 'ID Natura',
      dataIndex: 'id_natura',
      ellipsis: true,
      width: 160,
      key: 'id_natura',
    },
    {
      title: 'Cabang',
      dataIndex: 'cabang_id',
      width: 130,
      valueEnum: cabangFilter,
      render: (_, record) => {
        return record.cabang ? <Space>{record.cabang?.code}</Space> : '-';
      },
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
      title: 'Actions',
      valueType: 'option',
      key: 'option',
      width: 130,
      render: (_, record) => {
        if (record.status == 0 || record.status == 100) {
          return (
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
              <DetailIconButton
                key="Detail"
                code="detail"
                onClick={async () => {
                  dispatch({ type: ActionTypeEnum.DETTAIL, payload: record });
                }}
              />
            </Space>
          );
        } else {
          return (
            <Space size={2}>
              <DetailIconButton
                key="Detail"
                code="detail"
                onClick={async () => {
                  dispatch({ type: ActionTypeEnum.DETTAIL, payload: record });
                }}
              />
            </Space>
          );
        }
      },
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
            <Button key="3" onClick={() => history.push(`/natura/naturaapi`)}>
              List API
            </Button>,
            <Button key="2" onClick={() => history.push(`/natura/naturafile`)}>
              List Upload
            </Button>,
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
        tableLayout="auto"
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
        scroll={{ x: 'max-content' }}
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

      <NaturaDetailsDrawer
        visible={state.visibledetail}
        title={state.title}
        id={state.id == null ? '' : state.id}
        onCancel={() => {
          dispatch({ type: ActionTypeEnum.CANCEL });
        }}
      />
    </PageContainer>
  );
};

export default NaturaHeader;
