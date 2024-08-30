import React, { useEffect } from 'react';
import { Modal, Result } from 'antd';

type ModalProps = {
  onSuccess: () => void;
  onCancel: () => void;
  visible: boolean;
  subTitle: string;
};

const ModalSave: React.FC<ModalProps> = (props: ModalProps) => {
  const handleOk = () => {
    props.onSuccess();
  };

  const handleCancel = () => {
    props.onCancel();
  };

  useEffect(() => {
    if (!props.visible) {
      return;
    }
  }, [props]);

  return (
    <Modal
      open={props.visible}
      title="Result"
      width={800}
      okText="Back To List"
      cancelText="Add Again"
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Result status="success" title="Successfully Save Natura" subTitle={props.subTitle} />
    </Modal>
  );
};

export default ModalSave;
