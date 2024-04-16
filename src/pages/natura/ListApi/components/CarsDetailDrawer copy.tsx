import React, { useState, useEffect } from 'react';
import { Drawer, Typography } from 'antd';
import HeaderAPIDesc from './APIHeaderDesc';
import ErrLines from './ErrLines';
import { fetchCarsErrLine } from '@/services/oracle/oracle';
import { getCarsApiHeader } from '@/services/natura/naturaapi';
import CarsLines from './CarsLines';

const { Title } = Typography;

type CarsDetailsProps = {
  onCancel: () => void;
  visible: boolean;
  id: string;
  title: string;
};

const CarsDetailsDrawer: React.FC<CarsDetailsProps> = (props: CarsDetailsProps) => {
  const [formData, setFormData] = useState<API.CarsHeader>({});
  const [isErr, setIsErr] = useState<boolean>(false);

  useEffect(() => {
    if (!props.visible) {
      return;
    }

    if (props.id) {
      getCarsApiHeader(props.id).then(async (res) => {
        if (res.data) {
          const data = res.data;
          setIsErr(data.status! > 99 ? true : false);
          setFormData(data);
        }
      });
    }
  }, [props]);

  return (
    <Drawer
      open={props.visible}
      title={props.title}
      width={800}
      onClose={async () => {
        props.onCancel();
        return true;
      }}
    >
      <HeaderAPIDesc data={formData} visible={true} />
      <br />
      <CarsLines idheader={props.id} />
      <br />
      {isErr ? (
        <>
          <Title level={3}>Errors</Title>
          <ErrLines idheader={props.id} getfetch={fetchCarsErrLine} />
        </>
      ) : null}
    </Drawer>
  );
};

export default CarsDetailsDrawer;
