import { useState, useEffect } from 'react';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import { fetchCabang } from '@/services/master/cabang';

type CabangSelectProps = {
  value?: API.Cabang[];
  unitid: string;
  onChange?: (value: string) => void;
} & SelectProps;

const CabangSelect: React.FC<CabangSelectProps> = (props) => {
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [values, setValues] = useState<string>();

  useEffect(() => {
    const request = async (params: API.PaginationParam) => {
      const res = await fetchCabang(params);
      if (res.data) {
        return res.data.map((item) => {
          return { label: item.code + ' - ' + item.name, value: item.id };
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
      onChange={(value: string) => {
        setValues(value);
        if (props.onChange) {
          props.onChange(value);
        }
      }}
    />
  );
};

export default CabangSelect;
