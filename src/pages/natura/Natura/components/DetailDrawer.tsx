import React, { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import { getNaturaHeader } from '@/services/natura/naturaheader';
import NaturaHeaderDesc from './NaturaHeaderDesc';
import NaturaLines from './NaturaLines';

type NaturaDetailsProps = {
  onCancel: () => void;
  visible: boolean;
  id: string;
  title: string;
};

const NaturaDetailsDrawer: React.FC<NaturaDetailsProps> = (props: NaturaDetailsProps) => {
  const [formData, setFormData] = useState<API.NaturaHeader>({});

  useEffect(() => {
    if (!props.visible) {
      return;
    }

    if (props.id) {
      getNaturaHeader(props.id).then(async (res) => {
        if (res.data) {
          const data = res.data;
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
      <NaturaHeaderDesc data={formData} visible={true} />
      <br />
      <NaturaLines idheader={props.id} />
    </Drawer>
  );
};

export default NaturaDetailsDrawer;
