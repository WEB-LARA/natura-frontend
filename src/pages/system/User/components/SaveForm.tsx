import React, { useState, useEffect, useRef } from 'react';
import { useIntl } from 'umi';
import { message, Col } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormSwitch,
  ProFormItem,
} from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import RoleSelect from './RoleSelect';
import { addUser, getUser, updateUser } from '@/services/system/user';
import { Util } from '@/utils';
import NikSelect from '@/pages/master/Nik/components/NikSelect';
import UnitSelect from '@/pages/master/Unit/components/UnitSelect';
import CabangTagSelect from '@/pages/master/Cabang/components/CabangTagSelect';

type UserModalProps = {
  onSuccess: () => void;
  onCancel: () => void;
  visible: boolean;
  title: string;
  id?: string;
};

const UserModal: React.FC<UserModalProps> = (props: UserModalProps) => {
  const intl = useIntl();
  const formRef = useRef<ProFormInstance<API.User>>();
  const [disableCabang, setDisableCabang] = useState(false);
  const [nikID, setNikID] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [userData, setUserData] = useState<API.User>();
  const [unitId, setUnitId] = useState<string>('');

  useEffect(() => {
    if (!props.visible) {
      return;
    }

    formRef.current?.resetFields();
    // if edit
    if (props.id) {
      getUser(props.id).then(async (res) => {
        if (res.data) {
          const data = res.data;
          data.nik_id = res.data?.username + ' - ' + res.data?.name;
          setUserData(data);
          setUsername(data.username);
          setNikID(data.nik_id);
          setDisableCabang(false);
          data.all_cabang = false;
          data.statusChecked = data.status === 'activated';
          formRef.current?.setFieldsValue(data);
        }
      });
    }
  }, [props]);

  return (
    <ModalForm<API.User>
      open={props.visible}
      title={props.title}
      width={800}
      formRef={formRef}
      layout="vertical"
      grid={true}
      rowProps={{ gutter: 20 }}
      submitTimeout={3000}
      submitter={{
        searchConfig: {
          submitText: intl.formatMessage({ id: 'button.confirm' }),
          resetText: intl.formatMessage({ id: 'button.cancel' }),
        },
      }}
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
        onCancel: () => {
          props.onCancel();
        },
      }}
      onFinish={async (values: API.User) => {
        values.status = values.statusChecked ? 'activated' : 'freezed';
        if (values.all_cabang) {
          values.cabangs = [];
        }
        values.nik_id = nikID;
        values.username = username;
        delete values.statusChecked;
        //values.password = values.password ? Util.md5(values.password) : undefined;

        // if edit data
        if (props.id) {
          if (userData?.roles) {
            const roles = values.roles!;
            for (let i = 0; i < roles.length; i++) {
              for (let j = 0; j < userData?.roles?.length; j++) {
                if (roles[i].role_id === userData?.roles[j].role_id) {
                  roles[i].id = userData?.roles[j].id;
                  break;
                }
              }
            }
            values.roles = roles;
          }
          if (userData?.cabangs) {
            const cabangs = values.cabangs!;
            for (let i = 0; i < cabangs.length; i++) {
              for (let j = 0; j < userData?.cabangs?.length; j++) {
                if (cabangs[i].cabang_id === userData?.cabangs[j].cabang_id) {
                  cabangs[i].id = userData?.cabangs[j].id;
                  break;
                }
              }
            }
            values.cabangs = cabangs;
          }
          await updateUser(props.id, values);
        } else {
          await addUser(values);
        }

        message.success(intl.formatMessage({ id: 'component.message.success.save' }));
        props.onSuccess();
        return true;
      }}
      initialValues={{ statusChecked: true }}
    >
      <Col span={12}>
        <ProFormItem
          name="nik_id"
          label="NIK/Username"
          rules={[
            {
              required: true,
              message: 'NIK required',
            },
          ]}
        >
          <NikSelect
            onChange={(value) => {
              const splitted = value.label.split('-', 2);
              setNikID(value.key);
              setUsername(splitted[0].trim());
              formRef.current?.setFieldsValue({
                name: splitted[1].trim(),
              });
            }}
            placeholder="Select NIK"
          />
        </ProFormItem>
      </Col>
      {/* <ProFormText
        name="username"
        label={intl.formatMessage({ id: 'pages.system.user.form.username' })}
        placeholder={intl.formatMessage({ id: 'pages.system.user.form.username.placeholder' })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({ id: 'pages.system.user.form.username.required' }),
          },
        ]}
        colProps={{ span: 12 }}
      /> */}
      <ProFormText.Password
        name="password"
        label={intl.formatMessage({ id: 'pages.system.user.form.password' })}
        placeholder={
          props.id
            ? intl.formatMessage({ id: 'pages.system.user.form.password.update.placeholder' })
            : intl.formatMessage({ id: 'pages.system.user.form.password.placeholder' })
        }
        colProps={{ span: 12 }}
      />
      <ProFormText
        name="name"
        label={intl.formatMessage({ id: 'pages.system.user.form.name' })}
        placeholder={intl.formatMessage({ id: 'pages.system.user.form.name.placeholder' })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({ id: 'pages.system.user.form.name.required' }),
          },
        ]}
        colProps={{ span: 12 }}
      />

      <Col span={12}>
        <ProFormItem
          name="roles"
          label={intl.formatMessage({ id: 'pages.system.user.form.roles' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'pages.system.user.form.roles.required' }),
            },
          ]}
        >
          <RoleSelect
            placeholder={intl.formatMessage({ id: 'pages.system.user.form.roles.placeholder' })}
          />
        </ProFormItem>
      </Col>
      <Col span={12}>
        <ProFormItem
          name="unit_id"
          label="Unit"
          rules={[
            {
              required: true,
              message: 'Unit required',
            },
          ]}
        >
          <UnitSelect
            onChange={(value: string) => {
              setUnitId(value);
            }}
            placeholder="Select Unit"
          />
        </ProFormItem>
      </Col>
      <Col span={8}>
        <ProFormItem
          name="cabangs"
          label="Cabang"
          rules={[
            {
              required: !disableCabang,
              message: 'Cabang required',
            },
          ]}
        >
          <CabangTagSelect disabled={disableCabang} unitid={unitId} placeholder="Select Cabang" />
        </ProFormItem>
      </Col>
      <Col span={4}>
        <ProFormSwitch
          name="all_cabang"
          label="All Cabang"
          fieldProps={{
            checkedChildren: 'Yes',
            unCheckedChildren: 'No',
            onChange: (checked) => {
              setDisableCabang(checked);
            },
          }}
        />
      </Col>

      <ProFormText
        name="email"
        label={intl.formatMessage({ id: 'pages.system.user.form.email' })}
        placeholder={intl.formatMessage({ id: 'pages.system.user.form.email.placeholder' })}
        colProps={{ span: 12 }}
      />

      <ProFormText
        name="phone"
        label={intl.formatMessage({ id: 'pages.system.user.form.phone' })}
        placeholder={intl.formatMessage({ id: 'pages.system.user.form.phone.placeholder' })}
        colProps={{ span: 12 }}
      />
      <ProFormTextArea
        name="remark"
        label={intl.formatMessage({ id: 'pages.system.user.form.remark' })}
        fieldProps={{ rows: 2 }}
        colProps={{ span: 24 }}
      />
      <ProFormSwitch
        name="statusChecked"
        label={intl.formatMessage({ id: 'pages.system.user.form.status' })}
        fieldProps={{
          checkedChildren: intl.formatMessage({ id: 'pages.system.user.form.status.activated' }),
          unCheckedChildren: intl.formatMessage({ id: 'pages.system.user.form.status.freezed' }),
        }}
        colProps={{ span: 12 }}
      />
    </ModalForm>
  );
};

export default UserModal;
