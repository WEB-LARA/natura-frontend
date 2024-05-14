import { useState, useEffect } from 'react';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import { fetchAkun } from '@/services/master/akun';

type AkunSelectProps = {
  value?: API.Akun[];
  onChange?: (value: string) => void;
  flagPUM?: boolean;
} & SelectProps;

const AkunSelect: React.FC<AkunSelectProps> = (props) => {
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [values, setValues] = useState<string>();

  useEffect(() => {
    const request = async (params: API.PaginationParam) => {
      const res = await fetchAkun(params);
      if (res.data) {
        return res.data.map((item) => {
          return { label: item.account + ' - ' + item.description, value: item.id };
        });
      } else {
        return [];
      }
    };

    request({
      flag_active: true,
      flag_pum: props.flagPUM,
      resultType: 'select',
      pageSize: 100,
    }).then((data) => {
      setOptions(data);
    });
  }, [props.flagPUM]);

  useEffect(() => {
    if (props.value) {
      setValues(props.value);
    }
  }, [props.value]);

  return (
    <Select
      allowClear={false}
      showSearch
      {...props}
      options={options}
      value={values}
      onChange={(value: string) => {
        setValues(value);
        if (props.onChange) {
          props.onChange(value);
        }
      }}
    />
  );
};

export default AkunSelect;
