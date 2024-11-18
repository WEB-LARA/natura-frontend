import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Alert, Button, Card, Descriptions, Statistic, Timeline } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl, useModel } from 'umi';
import RcResizeObserver from 'rc-resize-observer';
import { SmileOutlined } from '@ant-design/icons';
import { fetchLogger } from '@/services/system/logger';
import moment from 'moment';
import { getNaturaHeaderCount } from '@/services/natura/naturaheader';

const { Divider } = ProCard;

const Stat: React.FC = () => {
  const [responsive, setResponsive] = useState(false);
  const [countData, setCountData] = useState<API.NaturaHeaderCount>({
    status_new: 0,
    status_process: 0,
    status_ready: 0,
    status_recon: 0,
    status_send: 0,
  });

  useEffect(() => {
    const request = async () => {
      const res = await getNaturaHeaderCount();
      if (res.data) {
        return res.data;
      } else {
        return {};
      }
    };

    request().then((data) => {
      setCountData(data);
    });
  }, []);

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard.Group title="Status Natura" direction={responsive ? 'column' : 'row'}>
        <ProCard>
          <Statistic title="New" value={countData.status_new} />
        </ProCard>
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <ProCard>
          <Statistic title="Recon" value={countData.status_recon} />
        </ProCard>
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <ProCard>
          <Statistic title="Process" value={countData.status_process} />
        </ProCard>
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <ProCard>
          <Statistic title="Ready" value={countData.status_ready} />
        </ProCard>
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <ProCard>
          <Statistic title="Send" value={countData.status_send} />
        </ProCard>
      </ProCard.Group>
    </RcResizeObserver>
  );
};

const Welcome: React.FC = () => {
  const intl = useIntl();
  const { initialState, setInitialState } = useModel('@@initialState');
  const [logs, setLogs] = useState<API.Logger[]>([]);
  const [refreshMe, setRefreshMe] = useState<boolean>(false);

  useEffect(() => {
    const request = async (params: API.PaginationParam) => {
      const res = await fetchLogger(params);
      if (res.data) {
        return res.data.map((item) => {
          return {
            username: item.user_id,
            message: item.message,
            created_at: moment(item.created_at).format('DD-MM-YYYY HH:mm:ss'),
            level: item.level,
          };
        });
      } else {
        return [];
      }
    };

    request({ user_id: initialState?.currentUser?.id, resultType: 'select', pageSize: 50 }).then(
      (data) => {
        setLogs(data);
      },
    );
  }, [initialState?.currentUser?.id, refreshMe]);

  return (
    <PageContainer>
      <Stat />
      <br />
      <Card>
        <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.alertMessage',
            defaultMessage:
              'Welcome to Natura Dashboard, Web Natura is web for calculate natura tax',
          })}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Descriptions
          title={
            initialState?.currentUser ? 'Welcome, ' + initialState?.currentUser?.name : 'Welcome'
          }
          style={{ marginBottom: 32 }}
        >
          <Descriptions.Item label="NIK">
            {initialState?.currentUser?.id == 'root' ? 'root' : initialState?.currentUser?.nik_id}
          </Descriptions.Item>

          <Descriptions.Item label="Roles">
            {initialState?.currentUser?.id == 'root' ? (
              'Administrator'
            ) : (
              <ul>
                {initialState?.currentUser?.roles?.map((roles) => (
                  <li key={roles.id}>{roles.role_name}</li>
                ))}
              </ul>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Unit">
            {initialState?.currentUser?.id == 'root'
              ? 'root'
              : initialState?.currentUser?.unit?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Cabang">
            {initialState?.currentUser?.id == 'root' ? (
              'root'
            ) : (
              <ul>
                {initialState?.currentUser?.cabangs?.map((cabang) => (
                  <li key={cabang.id}>{cabang.cabang_name}</li>
                ))}
              </ul>
            )}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <br />
      <Card
        title="My Activity"
        extra={
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setRefreshMe(!refreshMe);
            }}
          >
            Refresh
          </Button>
        }
      >
        <Timeline>
          {logs.map((log, index) => (
            <Timeline.Item key={index} color={log.level == 'error' ? 'red' : 'blue'}>
              <p>{log.message}</p>
              <p>{log.created_at}</p>
            </Timeline.Item>
          ))}
          {/* <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
          <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
          <Timeline.Item color="red">
            <p>Solve initial network problems 1</p>
            <p>Solve initial network problems 2</p>
            <p>Solve initial network problems 3 2015-09-01</p>
          </Timeline.Item>
          <Timeline.Item color="gray">
            <p>Technical testing 1</p>
            <p>Technical testing 2</p>
            <p>Technical testing 3 2015-09-01</p>
          </Timeline.Item>
          <Timeline.Item color="#00CCFF" dot={<SmileOutlined />}>
            <p>Custom color testing</p>
          </Timeline.Item> */}
        </Timeline>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
