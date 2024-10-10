import { getAPICount } from '@/services/oracle/oracle';
import { StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useEffect, useState } from 'react';

const { Divider } = StatisticCard;

const StatisticAPI: React.FC = () => {
  const [responsive, setResponsive] = useState(false);
  const [countData, setCountData] = useState<API.OracleAPICount>({
    oracle_ap: 0,
    oracle_gl_nik: 0,
    oracle_gl: 0,
    cars: 0,
    total: 0,
  });

  useEffect(() => {
    const request = async () => {
      const res = await getAPICount();
      if (res.data) {
        return res.data;
      } else {
        return {};
      }
    };

    request().then((data) => {
      setCountData({
        oracle_ap: data.oracle_ap,
        oracle_gl_nik: data.oracle_gl_nik,
        oracle_gl: data.oracle_gl,
        cars: data.cars,
        total: data.oracle_gl_nik! + data.oracle_gl! + data.cars!,
      });
    });
  }, []);

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
            value: countData.total,
          }}
        />
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <StatisticCard
          statistic={{
            title: 'Oracle GL Nik',
            value: countData.oracle_gl_nik,
          }}
          chartPlacement="left"
        />
        <StatisticCard
          statistic={{
            title: 'Oracle GL',
            value: countData.oracle_gl,
          }}
          chartPlacement="left"
        />
        <StatisticCard
          statistic={{
            title: 'Cars',
            value: countData.cars,
          }}
          chartPlacement="left"
        />
      </StatisticCard.Group>
    </RcResizeObserver>
  );
};

export default StatisticAPI;
