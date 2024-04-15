import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

type NaturaResultProps = {
  naturaIds: string[];
};

const ResultNatura: React.FC<NaturaResultProps> = (props: NaturaResultProps) => (
  <Result
    status="success"
    title="Successfully Save Natura!"
    subTitle={'ID Natura: ' + props.naturaIds}
    extra={[
      <Button
        type="primary"
        key="console"
        onClick={() => {
          history.push(`/natura/naturaheader`);
        }}
      >
        Go To List
      </Button>,
      <Button key="create" onClick={() => history.push(`/natura/naturaadd`)}>
        Add Again
      </Button>,
    ]}
  />
);

export default ResultNatura;
