import React, { useState, useEffect } from 'react';
import { Drawer, Typography } from 'antd';
import HeaderAPIDesc from './APIHeaderDesc';
import { getOracleGlNik } from '@/services/oracle/oracleglnik';
import GlNikLines from './GlNikLines';
import ErrLines from './ErrLines';
import { fetchGlNikErrLine } from '@/services/oracle/oracle';

const { Title } = Typography;

type GlNikDetailsProps = {
  onCancel: () => void;
  visible: boolean;
  id: string;
  title: string;
};

const GlNiDetailsDrawer: React.FC<GlNikDetailsProps> = (props: GlNikDetailsProps) => {
  const [formData, setFormData] = useState<API.OracleGlNik>({});
  const [isErr, setIsErr] = useState<boolean>(false);

  useEffect(() => {
    if (!props.visible) {
      return;
    }

    if (props.id) {
      getOracleGlNik(props.id).then(async (res) => {
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
      <GlNikLines idheader={props.id} />
      <br />
      {isErr ? (
        <>
          <Title level={3}>Errors</Title>
          <ErrLines idheader={props.id} getfetch={fetchGlNikErrLine} />
        </>
      ) : null}
    </Drawer>
  );
};

export default GlNiDetailsDrawer;
