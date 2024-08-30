import React, { useState, useEffect } from 'react';
import { Drawer, Typography } from 'antd';
import HeaderAPIDesc from './APIHeaderDesc';
import GlLines from './GlLines';
import { getOracleGl } from '@/services/oracle/oraclegl';
import ErrLines from './ErrLines';
import { fetchGlErrLine } from '@/services/oracle/oracle';

const { Title } = Typography;

type GlDetailsProps = {
  onCancel: () => void;
  visible: boolean;
  id: string;
  title: string;
};

const GlDetailsDrawer: React.FC<GlDetailsProps> = (props: GlDetailsProps) => {
  const [formData, setFormData] = useState<API.OracleGlNik>({});
  const [isErr, setIsErr] = useState<boolean>(false);

  useEffect(() => {
    if (!props.visible) {
      return;
    }

    if (props.id) {
      getOracleGl(props.id).then(async (res) => {
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
      <GlLines idheader={props.id} />
      <br />
      {isErr ? (
        <>
          <Title level={3}>Errors</Title>
          <ErrLines idheader={props.id} getfetch={fetchGlErrLine} />
        </>
      ) : null}
    </Drawer>
  );
};

export default GlDetailsDrawer;
