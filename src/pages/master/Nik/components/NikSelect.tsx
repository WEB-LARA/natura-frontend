import { useState, useEffect } from 'react';
import type { SelectProps } from 'antd';
import { fetchNik } from '@/services/master/nik';
import DebounceSelect from '@/components/SelectDebounce';

type NikSelectProps = {
  value?: API.Nik[];
  onChange?: (value: string) => void;
} & SelectProps;

const NikSelect: React.FC<NikSelectProps> = (props) => {
  //const [options, setOptions] = useState<SelectProps['options']>([]);
  const [value, setValue] = useState<string>();
  //const [value, setValue] = useState<NikValue>();

  const requestNik = async (niksearch: string) => {
    const res = await fetchNik({ status: 'enabled', resultType: 'select', nik: niksearch });
    if (res.data) {
      return res.data.map((item) => {
        return { label: item.nik + ' - ' + item.name, value: item.id };
      });
    } else {
      return [];
    }
  };

  useEffect(() => {
    if (props.value) {
      setValue(props.value);
    }
  }, [props.value]);

  return (
    <DebounceSelect
      allowClear={false}
      showSearch
      placeholder="Select NIK"
      {...props}
      fetchOptions={requestNik}
      value={value}
      onChange={(newValue: string) => {
        console.log(newValue);
        setValue(newValue);
        if (props.onChange) {
          props.onChange(newValue);
        }
      }}
    />
  );
};

export default NikSelect;
