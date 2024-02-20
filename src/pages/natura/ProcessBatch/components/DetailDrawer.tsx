import React from 'react';
import { Drawer } from 'antd';
import ProcessHeaders from './ProcessHeaders';

type ProcessDetailsProps = {
  onCancel: () => void;
  visible: boolean;
  id: string;
  title: string;
};

const ProcessDetailsDrawer: React.FC<ProcessDetailsProps> = (props: ProcessDetailsProps) => {
  //const [formData, setFormData] = useState<API.NaturaHeader>({});

  // useEffect(() => {
  //   if (!props.visible) {
  //     return;
  //   }

  //   if (props.id) {
  //     getNaturaHeader(props.id).then(async (res) => {
  //       if (res.data) {
  //         const data = res.data;
  //         setFormData(data);
  //       }
  //     });
  //   }
  // }, [props]);

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
      {/* <NaturaHeaderDesc data={formData} visible={true} />
      <br />
      <NaturaLines idheader={props.id} /> */}
      <ProcessHeaders idheader={props.id} />
    </Drawer>
  );
};

export default ProcessDetailsDrawer;
