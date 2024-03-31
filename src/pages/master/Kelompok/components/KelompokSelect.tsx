import { useState, useEffect } from 'react';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import { fetchKelompok } from '@/services/master/kelompok';

type KelompokSelectProps = {
  value?: API.Kelompok[];
  onChange?: (value: string) => void;
} & SelectProps;

const KelompokSelect: React.FC<KelompokSelectProps> = (props) => {
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [values, setValues] = useState<string>();

  useEffect(() => {
    const request = async (params: API.PaginationParam) => {
      const res = await fetchKelompok(params);
      if (res.data) {
        return res.data.map((item) => {
          return { label: item.code + ' - ' + item.name, value: item.id };
        });
      } else {
        return [];
      }
    };

    request({ flag_active: true, resultType: 'select' }).then((data) => {
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
      onChange={(value: string) => {
        setValues(value);
        if (props.onChange) {
          props.onChange(value);
        }
      }}
    />
  );
};

export default KelompokSelect;
