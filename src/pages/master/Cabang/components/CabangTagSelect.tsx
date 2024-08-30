import { useState, useEffect } from 'react';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import { fetchCabang } from '@/services/master/cabang';

type CabangTagSelectProps = {
  value?: API.UserCabang[];
  unitid: string;
  onChange?: (value: API.UserCabang[]) => void;
} & SelectProps;

const CabangTagSelect: React.FC<CabangTagSelectProps> = (props) => {
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {
    const request = async (params: API.PaginationParam) => {
      const res = await fetchCabang(params);
      if (res.data) {
        return res.data.map((item) => {
          return { label: item.name, value: item.id };
        });
      } else {
        return [];
      }
    };

    request({ unit_id: props.unitid, flag_active: true, resultType: 'select', pageSize: 100 }).then(
      (data) => {
        setOptions(data);
      },
    );
  }, [props.unitid]);

  useEffect(() => {
    if (props.value) {
      setValues(props.value.map((item) => item.cabang_id!));
    } else {
      setValues([]);
    }
  }, [props.value]);

  return (
    <Select
      allowClear={false}
      showSearch
      mode="tags"
      {...props}
      options={options}
      value={values}
      filterOption={(input, option) =>
        String(option?.label ?? '')
          .toLowerCase()
          .includes(input.toLowerCase())
      }
      onChange={(value: string[]) => {
        setValues(value);
        if (props.onChange) {
          console.log(value);
          props.onChange(
            value.map((item) => {
              return { cabang_id: item };
            }),
          );
        }
      }}
    />
  );
};

export default CabangTagSelect;
