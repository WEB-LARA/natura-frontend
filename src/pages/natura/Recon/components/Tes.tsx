import type {
  ActionType,
  EditableFormInstance,
  ProColumns,
  ProFormInstance,
} from '@ant-design/pro-components';
import {
  EditableProTable,
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormDigit,
} from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';

type DataSourceType = {
  id: React.Key;
  associate?: string;
  questionsNum?: number;
  type?: string;
  fraction?: number;
  scoringMethod?: string;
};
const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    associate: 'Question bank name one',
    questionsNum: 10,
    type: 'multiple',
    scoringMethod: 'continuous',
    fraction: 20,
  },
  {
    id: 624691229,
    associate: 'Question bank name two',
    questionsNum: 10,
    scoringMethod: 'continuous',
    type: 'radio',
    fraction: 20,
  },
  {
    id: 624748503,
    associate: 'Question bank name three',
    questionsNum: 10,
    type: 'judge',
    scoringMethod: 'continuous',
    fraction: 20,
  },
  {
    id: 624691220,
    associate: 'Question bank name four',
    questionsNum: 10,
    scoringMethod: 'discrete',
    type: 'vacant',
    fraction: 20,
  },
];

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => []);
  const formRef = useRef<ProFormInstance<any>>();
  const actionRef = useRef<ActionType>();
  const editableFormRef = useRef<EditableFormInstance>();
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: 'Associated question bank',
      dataIndex: 'associate',
      valueType: 'text',
      ellipsis: true,
    },
    {
      title: 'Question type',
      key: 'type',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: {
        multiple: { text: 'Multiple choice question', status: 'Default' },
        radio: { text: 'Single choice question', status: 'Warning' },
        vacant: {
          text: 'Fill in the blank',
          status: 'Error',
        },
        judge: {
          text: 'True or False Question',
          status: 'Success',
        },
      },
    },
    {
      title: 'Number of questions',
      dataIndex: 'questionsNum',
      valueType: 'digit',
    },
    {
      title: 'Scoring method',
      dataIndex: 'scoringMethod',
      valueType: 'select',
      request: async () => [
        {
          value: 'discrete',
          label: 'discrete',
        },
        {
          value: 'continuous',
          label: 'continuous',
        },
      ],
      fieldProps: (_, { rowIndex }) => {
        return {
          onSelect: () => {
            //Reset parameters each time you select
            editableFormRef.current?.setRowData?.(rowIndex, { fraction: [] });
          },
        };
      },
    },
    {
      title: 'Points',
      width: 150,
      dataIndex: 'fraction',
      valueType: (record) => {
        const scoringMethod = record?.scoringMethod;
        if (scoringMethod === 'discrete') return 'select';
        return 'digit';
      },
      fieldProps: {
        mode: 'multiple',
      },
      request: async () =>
        ['A', 'B', 'D', 'E', 'F'].map((item, index) => ({
          label: item,
          value: index,
        })),
    },
    {
      title: 'Operation',
      valueType: 'option',
      render: (_, row) => [
        <a
          key="delete"
          onClick={() => {
            const tableDataSource = formRef.current?.getFieldValue('table') as DataSourceType[];
            formRef.current?.setFieldsValue({
              table: tableDataSource.filter((item) => item.id !== row?.id),
            });
          }}
        >
          Remove
        </a>,
        <a
          key="edit"
          onClick={() => {
            actionRef.current?.startEditable(row.id);
          }}
        >
          edit
        </a>,
      ],
    },
  ];

  return (
    <ProCard>
      <div
        style={{
          maxWidth: 800,
          margin: 'auto',
        }}
      >
        <ProForm<{
          table: DataSourceType[];
        }>
          formRef={formRef}
          initialValues={{
            table: defaultData,
          }}
        >
          <ProFormDependency name={['table']}>
            {({ table }) => {
              const info = (table as DataSourceType[]).reduce(
                (pre, item) => {
                  return {
                    totalScore: pre.totalScore + parseInt((item?.fraction || 0).toString(), 10),
                    questions: pre.questions + parseInt((item?.questionsNum || 0).toString(), 10),
                  };
                },
                { totalScore: 0, questions: 0 },
              );
              return (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    paddingBlockEnd: 16,
                  }}
                >
                  <div style={{ flex: 1 }}>Total score:{info.totalScore}</div>
                  <div style={{ flex: 1 }}>Number of issues:{info.questions}</div>
                  <div style={{ flex: 2 }}>
                    <ProFormDigit label="passing score" />
                  </div>
                  <div style={{ flex: 2 }}>
                    <ProFormDigit label="Exam time (minutes)" />
                  </div>
                </div>
              );
            }}
          </ProFormDependency>
          <EditableProTable<DataSourceType>
            rowKey="id"
            scroll={{
              x: true,
            }}
            editableFormRef={editableFormRef}
            controlled
            actionRef={actionRef}
            formItemProps={{
              label: 'Question bank editor',
              rules: [
                {
                  validator: async (_, value) => {
                    if (value.length < 1) {
                      throw new Error('Please add at least one question bank');
                    }

                    if (value.length > 5) {
                      throw new Error('Up to five question banks can be set up');
                    }
                  },
                },
              ],
            }}
            maxLength={10}
            name="table"
            columns={columns}
            recordCreatorProps={{
              record: (index) => {
                return { id: index + 1 };
              },
            }}
            editable={{
              type: 'multiple',
              editableKeys,
              onChange: setEditableRowKeys,
            }}
          />
        </ProForm>
      </div>
    </ProCard>
  );
};
