import { StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

const { Statistic, Divider } = StatisticCard;

const StatisticAPI: React.FC = () => {
  const [responsive, setResponsive] = useState(false);

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <StatisticCard.Group direction={responsive ? 'column' : 'row'}>
        <StatisticCard
          statistic={{
            title: 'Total Data API',
            value: 601986875,
          }}
        />
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <StatisticCard
          statistic={{
            title: 'Oracle',
            value: 3701928,
            description: <Statistic title="Proportion" value="61.5%" />,
          }}
          chartPlacement="left"
        />
        <StatisticCard
          statistic={{
            title: 'Oracle GL',
            value: 2102540,
            description: <Statistic title="Proportion" value="61.5%" />,
          }}
          chartPlacement="left"
        />
        <StatisticCard
          statistic={{
            title: 'Cars',
            value: 1806062,
            description: <Statistic title="Proportion" value="38.5%" />,
          }}
          chartPlacement="left"
        />
      </StatisticCard.Group>
    </RcResizeObserver>
  );
};

export default StatisticAPI;
