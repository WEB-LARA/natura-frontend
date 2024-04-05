import { useState, useEffect } from 'react';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import { fetchWilayah } from '@/services/master/wilayah';

type WilayahSelectProps = {
  value?: API.Wilayah[];
  onChange?: (value: string) => void;
} & SelectProps;

const WilayahSelect: React.FC<WilayahSelectProps> = (props) => {
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [values, setValues] = useState<string>();

  useEffect(() => {
    const request = async (params: API.PaginationParam) => {
      const res = await fetchWilayah(params);
      if (res.data) {
        return res.data.map((item) => {
          return { label: item.code + ' - ' + item.name, value: item.id };
        });
      } else {
        return [];
      }
    };

    request({ status: 'enabled', resultType: 'select', pageSize: 100 }).then((data) => {
      setOptions(data);
    });
  }, []);

  useEffect(() => {
    console.log(props.value);
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
      filterOption={(input, option) =>
        String(option?.label ?? '')
          .toLowerCase()
          .includes(input.toLowerCase())
      }
      onChange={(value: string) => {
        setValues(value);
        if (props.onChange) {
          props.onChange(value);
        }
      }}
    />
  );
};

export default WilayahSelect;
