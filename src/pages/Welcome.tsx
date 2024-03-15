import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Alert, Card, Descriptions, Statistic, Timeline, Typography } from 'antd';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';
import RcResizeObserver from 'rc-resize-observer';
import { SmileOutlined } from '@ant-design/icons';

const { Divider } = ProCard;

const Stat: React.FC = () => {
  const [responsive, setResponsive] = useState(false);
  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard.Group title="Status Natura" direction={responsive ? 'column' : 'row'}>
        <ProCard>
          <Statistic title="New" value={79.0} precision={2} />
        </ProCard>
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <ProCard>
          <Statistic title="Recon" value={112893.0} precision={2} />
        </ProCard>
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <ProCard>
          <Statistic title="Process" value={93} />
        </ProCard>
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <ProCard>
          <Statistic title="Ready" value={112893.0} />
        </ProCard>
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <ProCard>
          <Statistic title="Send" value={264638} />
        </ProCard>
      </ProCard.Group>
    </RcResizeObserver>
  );
};

const Welcome: React.FC = () => {
  const intl = useIntl();
  return (
    <PageContainer>
      <Stat />
      <br />
      <Card>
        <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.alertMessage',
            defaultMessage: 'Faster and stronger heavy-duty components have been released.',
          })}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Descriptions title="Welcome, Agus" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="NIK">201309289</Descriptions.Item>
          <Descriptions.Item label="Unit">PT. Indomarco Prismatama</Descriptions.Item>
          <Descriptions.Item label="Cabang">JAKARTA</Descriptions.Item>
          <Descriptions.Item label="Roles">Admin</Descriptions.Item>
        </Descriptions>
      </Card>
      <br />
      <Card title="My Activity">
        <Timeline>
          <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
          <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
          <Timeline.Item color="red">
            <p>Solve initial network problems 1</p>
            <p>Solve initial network problems 2</p>
            <p>Solve initial network problems 3 2015-09-01</p>
          </Timeline.Item>
          <Timeline.Item>
            <p>Technical testing 1</p>
            <p>Technical testing 2</p>
            <p>Technical testing 3 2015-09-01</p>
          </Timeline.Item>
          <Timeline.Item color="gray">
            <p>Technical testing 1</p>
            <p>Technical testing 2</p>
            <p>Technical testing 3 2015-09-01</p>
          </Timeline.Item>
          <Timeline.Item color="gray">
            <p>Technical testing 1</p>
            <p>Technical testing 2</p>
            <p>Technical testing 3 2015-09-01</p>
          </Timeline.Item>
          <Timeline.Item color="#00CCFF" dot={<SmileOutlined />}>
            <p>Custom color testing</p>
          </Timeline.Item>
        </Timeline>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
