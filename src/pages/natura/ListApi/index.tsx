import { PageContainer } from '@ant-design/pro-components';
import React, { useRef, useReducer, useState, useEffect } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Alert, Button, PageHeader, Space, Tabs, Tag, message } from 'antd';
import { EditIconButton, DelIconButton, DetailIconButton } from '@/components/Button';
import type { StatusCase } from '@/utils/util';
import { codeToStatusCase } from '@/utils/util';
import { CheckCircleOutlined, RedoOutlined } from '@ant-design/icons';
import StatisticAPI from './components/StatisticAPI';

import { fetchOracleAp } from '@/services/oracle/oracleap';
import { delOracleGl, fetchOracleGl } from '@/services/oracle/oraclegl';
import { delOracleGlNik, fetchOracleGlNik } from '@/services/oracle/oracleglnik';
import { delCarsApiHeader, fetchCarsApiHeader } from '@/services/natura/naturaapi';
import APAPIModal from './components/SaveFormAP';
import GlAPIModal from './components/SaveFormGL';
import { proccessAll, validateAll } from '@/services/oracle/oracle';
import GlNiDetailsDrawer from './components/GlNikDetailDrawer';
import CarsDetailsDrawer from './components/CarsDetailDrawer';
import { fetchUnitFilter } from '@/services/master/unit';
import { fetchCabangFilter } from '@/services/master/cabang';
import { fetchOracleGlRev } from '@/services/oracle/oracleglrev';
import { fetchOracleApRev } from '@/services/oracle/oracleaprev';

enum ActionTypeEnum {
  EDITCARS,
  EDITAP,
  EDITGL,
  EDITGLNIK,
  DETAIL,
  DETAILCARS,
  CANCEL,
}

interface Action {
  type: ActionTypeEnum;
  payload?: API.CarsHeader | API.OracleAp;
}

interface State {
  visibleAP: boolean;
  visibleGL: boolean;
  visibleGLNIK: boolean;
  visibleCars: boolean;
  visibledetail: boolean;
  title: string;
  id?: string;
}

const ListApi: React.FC = () => {
  const [unitFilter, setUnitFilter] = useState<API.FilterType>({});
  const [cabangFilter, setCabangFilter] = useState<API.FilterType>({});
  const [loading, setLoading] = useState(false);

  const actionRef = useRef<ActionType>();
  const actionRefGL = useRef<ActionType>();
  const actionRefGLNik = useRef<ActionType>();
  const actionRefCars = useRef<ActionType>();
  const actionRefGLRev = useRef<ActionType>();
  const actionRefAPRev = useRef<ActionType>();
  const editTitle = 'Edit API';
  const delTip = 'Delete API';

  useEffect(() => {
    const requestUnit = async () => {
      const res = await fetchUnitFilter();
      if (res) {
        return res;
      } else {
        return {};
      }
    };

    const requestCabang = async () => {
      const res = await fetchCabangFilter();
      if (res) {
        return res;
      } else {
        return {};
      }
    };

    requestUnit().then((data) => {
      setUnitFilter(data);
    });

    requestCabang().then((data) => {
      setCabangFilter(data);
    });
  }, []);

  const [state, dispatch] = useReducer(
    (pre: State, action: Action) => {
      switch (action.type) {
        case ActionTypeEnum.DETAIL:
          return {
            visibleCars: false,
            visibleAP: false,
            visibleGL: false,
            visibleGLNIK: false,
            visibledetail: true,
            title: 'Detail Data',
            id: action.payload?.id,
          };
        case ActionTypeEnum.DETAILCARS:
          return {
            visibleCars: true,
            visibleAP: false,
            visibleGL: false,
            visibleGLNIK: false,
            visibledetail: false,
            title: 'Detail Data',
            id: action.payload?.id,
          };
        case ActionTypeEnum.EDITCARS:
          return {
            visibleCars: true,
            visibleAP: false,
            visibleGL: false,
            visibleGLNIK: false,
            visibledetail: false,
            title: editTitle,
            id: action.payload?.id,
          };
        case ActionTypeEnum.EDITAP:
          return {
            visibleCars: false,
            visibleAP: true,
            visibleGL: false,
            visibleGLNIK: false,
            visibledetail: false,
            title: editTitle,
            id: action.payload?.id,
          };
        case ActionTypeEnum.EDITGL:
          return {
            visibleCars: false,
            visibleAP: false,
            visibleGL: true,
            visibleGLNIK: false,
            visibledetail: false,
            title: editTitle,
            id: action.payload?.id,
          };
        case ActionTypeEnum.EDITGLNIK:
          return {
            visibleCars: false,
            visibleAP: false,
            visibleGL: false,
            visibleGLNIK: true,
            visibledetail: false,
            title: editTitle,
            id: action.payload?.id,
          };
        case ActionTypeEnum.CANCEL:
          return {
            visibleCars: false,
            visibleAP: false,
            visibleGL: false,
            visibleGLNIK: false,
            visibledetail: false,
            title: '',
            id: undefined,
          };
        default:
          return pre;
      }
    },
    {
      visibleCars: false,
      visibleAP: false,
      visibleGLNIK: false,
      visibleGL: false,
      visibledetail: false,
      title: '',
    },
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
      title: 'Account',
      dataIndex: 'account',
      ellipsis: true,
      width: 100,
      key: 'account',
    },
    {
      title: 'Date',
      dataIndex: 'trx_date',
      ellipsis: true,
      width: 160,
      key: 'trx_date',
      render: (_, record) => {
        return <Tag color="default">{record.trx_date}</Tag>;
      },
    },
    {
      title: 'Unit',
      dataIndex: 'unit_name',
      ellipsis: true,
      width: 160,
      key: 'unit_name',
      filters: true,
      onFilter: true,
      valueEnum: unitFilter,
    },
    {
      title: 'Branch',
      dataIndex: 'branch_name',
      ellipsis: true,
      width: 160,
      key: 'branch_name',
      filters: true,
      onFilter: true,
      valueEnum: cabangFilter,
    },
    // {
    //   title: 'Actions',
    //   valueType: 'option',
    //   key: 'option',
    //   width: 130,
    //   render: (_, record) => (
    //     <Space size={2}>
    //       <EditIconButton
    //         key="edit"
    //         code="edit"
    //         onClick={() => {
    //           dispatch({ type: ActionTypeEnum.EDITAP, payload: record });
    //         }}
    //       />
    //       <DelIconButton
    //         key="delete"
    //         code="delete"
    //         title={delTip}
    //         onConfirm={async () => {
    //           const res = await delOracleAp(record.id!);
    //           if (res.success) {
    //             message.success('Delete successfully');
    //             actionRef.current?.reload();
    //           }
    //         }}
    //       />
    //     </Space>
    //   ),
    // },
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
      title: 'Date',
      dataIndex: 'trx_date',
      ellipsis: true,
      width: 160,
      key: 'trx_date',
      render: (_, record) => {
        return <Tag color="default">{record.trx_date}</Tag>;
      },
    },
    {
      title: 'Unit',
      dataIndex: 'unit_name',
      ellipsis: true,
      width: 160,
      key: 'unit_name',
      filters: true,
      onFilter: true,
      valueEnum: unitFilter,
    },
    {
      title: 'Branch',
      dataIndex: 'branch_name',
      ellipsis: true,
      width: 160,
      key: 'branch_name',
      filters: true,
      onFilter: true,
      valueEnum: cabangFilter,
    },
    {
      title: 'Actions',
      valueType: 'option',
      key: 'option',
      width: 130,
      render: (_, record) => {
        if (record.status == 0) {
          return (
            <Space size={2}>
              <EditIconButton
                key="edit"
                code="edit"
                onClick={() => {
                  dispatch({ type: ActionTypeEnum.EDITGL, payload: record });
                }}
              />
              <DelIconButton
                key="delete"
                code="delete"
                title={delTip}
                onConfirm={async () => {
                  const res = await delOracleGl(record.id!);
                  if (res.success) {
                    message.success('Delete successfully');
                    actionRefGL.current?.reload();
                  }
                }}
              />
            </Space>
          );
        } else {
          return <Space size={2} />;
        }
      },
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
    // {
    //   title: 'Date',
    //   dataIndex: 'trx_date',
    //   ellipsis: true,
    //   width: 160,
    //   key: 'trx_date',
    //   render: (text, record) => {
    //     const formatStr = 'YYYY-MM-DD HH:mm:ss.SSSSSSSSS Z';
    //     const localTime = moment(record.trx_date, formatStr).format('YYYY-MM-DD HH:mm');
    //     return <Tag color="default">{localTime}</Tag>;
    //   },
    // },
    {
      title: 'Date',
      dataIndex: 'trx_date',
      ellipsis: true,
      width: 160,
      key: 'trx_date',
      render: (_, record) => {
        return <Tag color="default">{record.trx_date}</Tag>;
      },
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
      render: (_, record) => {
        if (record.status == 0) {
          return (
            <Space size={2}>
              <DetailIconButton
                key="Detail"
                code="detail"
                onClick={async () => {
                  dispatch({ type: ActionTypeEnum.DETAIL, payload: record });
                }}
              />
              <DelIconButton
                key="delete"
                code="delete"
                title={delTip}
                onConfirm={async () => {
                  const res = await delOracleGlNik(record.id!);
                  if (res.success) {
                    message.success('Delete successfully');
                    actionRefGLNik.current?.reload();
                  }
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
                  dispatch({ type: ActionTypeEnum.DETAIL, payload: record });
                }}
              />
            </Space>
          );
        }
      },
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
      title: 'Date',
      dataIndex: 'trx_date',
      ellipsis: true,
      width: 160,
      key: 'trx_date',
      render: (text, record) => {
        return <Tag color="default">{record.trx_date}</Tag>;
      },
    },
    {
      title: 'Unit',
      dataIndex: 'unit_name',
      ellipsis: true,
      width: 160,
      key: 'unit_name',
      filters: true,
      onFilter: true,
      valueEnum: unitFilter,
    },
    {
      title: 'Branch',
      dataIndex: 'branch_name',
      ellipsis: true,
      width: 160,
      key: 'branch_name',
      filters: true,
      onFilter: true,
      valueEnum: cabangFilter,
    },
    {
      title: 'Actions',
      valueType: 'option',
      key: 'option',
      width: 130,
      render: (_, record) => {
        if (record.status == 0) {
          return (
            <Space size={2}>
              <DetailIconButton
                key="Detail"
                code="detail"
                onClick={async () => {
                  dispatch({ type: ActionTypeEnum.DETAILCARS, payload: record });
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
                    actionRefCars.current?.reload();
                  }
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
                  dispatch({ type: ActionTypeEnum.DETAILCARS, payload: record });
                }}
              />
            </Space>
          );
        }
      },
    },
  ];

  const columnGlRevs: ProColumns<API.OracleGlRev>[] = [
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
      title: 'Id Natura Ref',
      dataIndex: 'id_natura_ref',
      ellipsis: true,
      width: 160,
      key: 'id_natura_ref',
    },
    {
      title: 'Date',
      dataIndex: 'trx_date',
      ellipsis: true,
      width: 160,
      key: 'trx_date',
      render: (_, record) => {
        return <Tag color="default">{record.trx_date}</Tag>;
      },
    },
    {
      title: 'Unit',
      dataIndex: 'unit_name',
      ellipsis: true,
      width: 160,
      key: 'unit_name',
      filters: true,
      onFilter: true,
      valueEnum: unitFilter,
    },
    {
      title: 'Branch',
      dataIndex: 'branch_name',
      ellipsis: true,
      width: 160,
      key: 'branch_name',
      filters: true,
      onFilter: true,
      valueEnum: cabangFilter,
    },
  ];

  const columnApRevs: ProColumns<API.OracleApRev>[] = [
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
      title: 'Id Natura Ref',
      dataIndex: 'id_natura_ref',
      ellipsis: true,
      width: 160,
      key: 'id_natura_ref',
    },
    {
      title: 'Account',
      dataIndex: 'account',
      ellipsis: true,
      width: 100,
      key: 'account',
    },
    {
      title: 'Date',
      dataIndex: 'trx_date',
      ellipsis: true,
      width: 160,
      key: 'trx_date',
      render: (_, record) => {
        return <Tag color="default">{record.trx_date}</Tag>;
      },
    },
    {
      title: 'Unit',
      dataIndex: 'unit_name',
      ellipsis: true,
      width: 160,
      key: 'unit_name',
      filters: true,
      onFilter: true,
      valueEnum: unitFilter,
    },
    {
      title: 'Branch',
      dataIndex: 'branch_name',
      ellipsis: true,
      width: 160,
      key: 'branch_name',
      filters: true,
      onFilter: true,
      valueEnum: cabangFilter,
    },
  ];

  const handleValidate = async () => {
    setLoading(true);
    await validateAll().then((response) => {
      message.success(
        'Success Validate = Oracle GL: ' +
          response.data?.oracle_gl_jml +
          ' Oracle GL NIK: ' +
          response.data?.oracle_gl_nik_jml +
          ' Cars: ' +
          response.data?.cars_jml,
      );
      setLoading(false);
    });
  };

  const handleProccess = async () => {
    setLoading(true);
    await proccessAll().then((response) => {
      message.success(
        'Success Proccess = Oracle GL: ' +
          response.data?.oracle_gl_jml +
          ' Oracle GL NIK: ' +
          response.data?.oracle_gl_nik_jml +
          ' Cars: ' +
          response.data?.cars_jml,
      );
      setLoading(false);
    });
    // message.success('Success Proccess');
  };

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
                loading={loading}
                icon={<CheckCircleOutlined />}
                onClick={() => handleValidate()}
              >
                Validate API
              </Button>,
              <Button
                key="2"
                type="primary"
                loading={loading}
                icon={<RedoOutlined />}
                onClick={() => handleProccess()}
              >
                Proccess API
              </Button>,
            ]}
          >
            <StatisticAPI />
          </PageHeader>
        </div>

        <Tabs>
          <Tabs.TabPane tab="Oracle GL" key="item-1">
            <Alert
              message="Wajib melengkapi NIK di (edit) untuk dapat di Validate"
              type="info"
              showIcon
            />
            <br />
            <ProTable<API.OracleGl, API.PaginationParam>
              columns={columnGls}
              actionRef={actionRefGL}
              request={fetchOracleGl}
              rowKey="id"
              cardBordered
              tableLayout="auto"
              search={{
                labelWidth: 'auto',
              }}
              pagination={{ pageSize: 10, showSizeChanger: true }}
              scroll={{ x: 'max-content' }}
              options={{
                density: true,
                fullScreen: true,
                reload: true,
              }}
              dateFormatter="string"
            />
            <GlAPIModal
              visible={state.visibleGL}
              title={state.title}
              id={state.id == null ? '' : state.id}
              onCancel={() => {
                dispatch({ type: ActionTypeEnum.CANCEL });
              }}
              onSuccess={() => {
                actionRefGL.current?.reload();
                dispatch({ type: ActionTypeEnum.CANCEL });
              }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Oracle GL Nik" key="item-2">
            <ProTable<API.OracleGlNik, API.PaginationParam>
              columns={columnGlniks}
              actionRef={actionRefGLNik}
              request={fetchOracleGlNik}
              rowKey="id"
              cardBordered
              tableLayout="auto"
              search={{
                labelWidth: 'auto',
              }}
              pagination={{ pageSize: 10, showSizeChanger: true }}
              scroll={{ x: 'max-content' }}
              options={{
                density: true,
                fullScreen: true,
                reload: true,
              }}
              dateFormatter="string"
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Cars" key="item-3">
            <ProTable<API.CarsHeader, API.PaginationParam>
              columns={columnCars}
              actionRef={actionRefCars}
              request={fetchCarsApiHeader}
              rowKey="id"
              cardBordered
              tableLayout="auto"
              search={{
                labelWidth: 'auto',
              }}
              pagination={{ pageSize: 10, showSizeChanger: true }}
              scroll={{ x: 'max-content' }}
              options={{
                density: true,
                fullScreen: true,
                reload: true,
              }}
              dateFormatter="string"
            />

            <CarsDetailsDrawer
              visible={state.visibleCars}
              title={state.title}
              id={state.id == null ? '' : state.id}
              onCancel={() => {
                dispatch({ type: ActionTypeEnum.CANCEL });
              }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Oracle AP" key="item-4">
            <Alert
              message="API terima data dari Oracle untuk Natura Reconcilliation (TIDAK di Validate dan Proccess)"
              type="info"
              showIcon
            />
            <br />
            <ProTable<API.OracleAp, API.PaginationParam>
              columns={columnAps}
              actionRef={actionRef}
              request={fetchOracleAp}
              rowKey="id"
              cardBordered
              tableLayout="auto"
              search={{
                labelWidth: 'auto',
              }}
              pagination={{ pageSize: 10, showSizeChanger: true }}
              scroll={{ x: 'max-content' }}
              options={{
                density: true,
                fullScreen: true,
                reload: true,
              }}
              dateFormatter="string"
            />
            <APAPIModal
              visible={state.visibleAP}
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
          <Tabs.TabPane tab="Oracle GL Reverse" key="item-5">
            <ProTable<API.OracleGlRev, API.PaginationParam>
              columns={columnGlRevs}
              actionRef={actionRefGLRev}
              request={fetchOracleGlRev}
              rowKey="id"
              cardBordered
              tableLayout="auto"
              search={{
                labelWidth: 'auto',
              }}
              pagination={{ pageSize: 10, showSizeChanger: true }}
              scroll={{ x: 'max-content' }}
              options={{
                density: true,
                fullScreen: true,
                reload: true,
              }}
              dateFormatter="string"
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Oracle AP Reverse" key="item-6">
            <ProTable<API.OracleApRev, API.PaginationParam>
              columns={columnApRevs}
              actionRef={actionRefAPRev}
              request={fetchOracleApRev}
              rowKey="id"
              cardBordered
              tableLayout="auto"
              search={{
                labelWidth: 'auto',
              }}
              pagination={{ pageSize: 10, showSizeChanger: true }}
              scroll={{ x: 'max-content' }}
              options={{
                density: true,
                fullScreen: true,
                reload: true,
              }}
              dateFormatter="string"
            />
          </Tabs.TabPane>
        </Tabs>
      </PageContainer>

      <GlNiDetailsDrawer
        visible={state.visibledetail}
        title={state.title}
        id={state.id == null ? '' : state.id}
        onCancel={() => {
          dispatch({ type: ActionTypeEnum.CANCEL });
        }}
      />
    </>
  );
};

export default ListApi;
