import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, PageHeader, Space, Tag, message } from 'antd';
import { DelIconButton, DetailIconButton, ProcessButton } from '@/components/Button';
import type { StatusCase } from '@/utils/util';
import { codeToStatusCase } from '@/utils/util';
import { PlusOutlined } from '@ant-design/icons';
import { history } from 'umi';
import {
  delTampFileHeader,
  fetchTampFileHeader,
  processTampFileHeader,
} from '@/services/natura/naturafile';
import DetailsDrawer from './components/DetailDrawer';
import { fetchUnitFilter } from '@/services/master/unit';
import { fetchCabangFilter } from '@/services/master/cabang';

const ListFile: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [loading, setLoading] = useState(false);
  const [visibledetail, setVisibledetail] = useState(false);
  const [idHeader, setIdHeader] = useState('');
  const [unitFilter, setUnitFilter] = useState<API.FilterType>({});
  const [cabangFilter, setCabangFilter] = useState<API.FilterType>({});

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
        if (record.status == 0 || record.status! >= 100) {
          return (
            <Space size={2}>
              <ProcessButton
                key="Process"
                code="process"
                loading={loading}
                onClick={async () => {
                  setLoading(true);
                  const dataSave: API.TampFileHeader = {
                    nama_file: record.nama_file,
                  };
                  dataSave.nama_file = record.nama_file;
                  const res = await processTampFileHeader(dataSave);
                  if (res.success) {
                    message.success('Process successfully');
                    actionRef.current?.reload();
                  }
                  setLoading(false);
                }}
              />
              <DetailIconButton
                key="Detail"
                code="detail"
                onClick={async () => {
                  setIdHeader(record.id!);
                  setVisibledetail(true);
                }}
              />
              <DelIconButton
                key="Delete"
                code="delete"
                title="Delete"
                onConfirm={async () => {
                  const res = await delTampFileHeader(record.id!);
                  if (res.success) {
                    message.success('Delete successfully');
                    actionRef.current?.reload();
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
                  setIdHeader(record.id!);
                  setVisibledetail(true);
                }}
              />
            </Space>
          );
        }
      },
    },
  ];

  return (
    <>
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
      </PageContainer>

      <DetailsDrawer
        visible={visibledetail}
        title="Natura List File Detail"
        id={idHeader}
        onCancel={() => {
          setVisibledetail(false);
        }}
      />
    </>
  );
};

export default ListFile;
