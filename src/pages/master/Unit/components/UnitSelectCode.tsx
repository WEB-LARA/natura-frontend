import { useState, useEffect } from 'react';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import { fetchUnit } from '@/services/master/unit';

type UnitSelectCodeProps = {
  value?: API.Unit[];
  onChange?: (value: string) => void;
} & SelectProps;

const UnitSelectCode: React.FC<UnitSelectCodeProps> = (props) => {
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [values, setValues] = useState<string>();

  useEffect(() => {
    const request = async (params: API.PaginationParam) => {
      const res = await fetchUnit(params);
      if (res.data) {
        return res.data.map((item) => {
          return { label: item.reference_id + ' - ' + item.name, value: item.code };
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

export default UnitSelectCode;
