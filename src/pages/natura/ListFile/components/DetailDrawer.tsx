import React, { useState, useEffect } from 'react';
import { Drawer, Typography } from 'antd';
import HeaderDesc from './HeaderDesc';
import ListLines from './ListLines';
import ErrLines from '../../ListApi/components/ErrLines';
import { fetchTampFileErr } from '@/services/natura/tampfileerr';
import { getTampFileHeader } from '@/services/natura/naturafile';

const { Title } = Typography;

type DetailsProps = {
  onCancel: () => void;
  visible: boolean;
  id: string;
  title: string;
};

const DetailsDrawer: React.FC<DetailsProps> = (props: DetailsProps) => {
  const [formData, setFormData] = useState<API.TampFileHeader>({});
  const [isErr, setIsErr] = useState<boolean>(false);

  useEffect(() => {
    if (!props.visible) {
      return;
    }

    if (props.id) {
      getTampFileHeader(props.id).then(async (res) => {
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
      <HeaderDesc data={formData} visible={true} />
      <br />
      <ListLines idheader={props.id} />
      <br />
      {isErr ? (
        <>
          <Title level={3}>Errors</Title>
          <ErrLines idheader={props.id} getfetch={fetchTampFileErr} />
        </>
      ) : null}
    </Drawer>
  );
};

export default DetailsDrawer;
