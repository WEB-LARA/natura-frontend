import { useState, useEffect } from 'react';
import type { SelectProps } from 'antd';
import { fetchNik } from '@/services/master/nik';
import DebounceSelect from '@/components/SelectDebounce';

type NikSelectProps = {
  value?: API.Nik[];
  onChange?: (value: any) => void;
} & SelectProps;

const NikSelect: React.FC<NikSelectProps> = (props) => {
  //const [options, setOptions] = useState<SelectProps['options']>([]);
  const [values, setValues] = useState<any>();
  //const [value, setValue] = useState<NikValue>();

  const requestNik = async (niksearch: string) => {
    const res = await fetchNik({ flag_aktif: true, resultType: 'select', nik: niksearch });
    if (res.data) {
      return res.data.map((item) => {
        return { label: item.nik + ' - ' + item.name, value: item.id };
      });
    } else {
      return [];
    }
  };

  useEffect(() => {
    //console.log(props.value);
    if (props.value) {
      setValues(props.value);
    }
  }, [props.value]);

  return (
    <DebounceSelect
      allowClear={false}
      showSearch
      placeholder="Select NIK"
      {...props}
      fetchOptions={requestNik}
      value={values}
      onChange={(value) => {
        console.log(value);
        setValues(value);
        if (props.onChange) {
          props.onChange(value);
        }
      }}
    />
  );
};

export default NikSelect;
