import { useState, useEffect } from 'react';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import { fetchSource } from '@/services/master/source';

type SourceSelectProps = {
  value?: API.Source[];
  onChange?: (value: string) => void;
} & SelectProps;

const SourceSelect: React.FC<SourceSelectProps> = (props) => {
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [values, setValues] = useState<string>();

  useEffect(() => {
    const request = async (params: API.PaginationParam) => {
      const res = await fetchSource(params);
      if (res.data) {
        return res.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      } else {
        return [];
      }
    };

    request({ flag_active: true, resultType: 'select', pageSize: 100 }).then((data) => {
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

export default SourceSelect;
