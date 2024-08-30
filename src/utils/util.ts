import type { PresetStatusColorType } from 'antd/es/_util/colors';
import MD5 from 'md5';

/**
 * The function exports a TypeScript implementation of the MD5 hashing algorithm for a given string.
 */
export function md5(str: string) {
  return MD5(str);
}

/**
 * The function sets the username in the local storage.
 * @param {string} username - A string representing the username that needs to be set.
 */
export function setUsername(username: string) {
  localStorage.setItem('username', username);
}

/**
 * The function `getUsername` returns the value of the 'username' key from the localStorage, or null if
 * it doesn't exist.
 * @returns a string value or null.
 */
export function getUsername(): string | null {
  return localStorage.getItem('username');
}

export function convertTreeData<T>(
  data: T[],
  convertT?: (item: T) => {
    id: string;
    name: string;
    parent_id?: string;
    disabled?: boolean;
    children: T[];
  },
): API.TreeItem[] {
  const treeData: API.TreeItem[] = [];
  data.forEach((item) => {
    const dataItem = convertT
      ? convertT(item)
      : (item as {
          id: string;
          name: string;
          parent_id?: string;
          disabled?: boolean;
          children: T[];
        });

    const treeItem: API.TreeItem = {
      id: dataItem.id,
      key: dataItem.id,
      title: dataItem.name,
      value: dataItem.id,
      label: dataItem.name,
      parent_id: dataItem.parent_id,
      children: dataItem.children ? convertTreeData(dataItem.children, convertT) : [],
    };

    if (dataItem.disabled) {
      treeItem.disabled = dataItem.disabled!;
    }
    treeData.push(treeItem);
  });
  return treeData;
}

export const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
};

export interface StatusCase {
  color: string;
  tulis: string;
  loading: boolean;
  status: PresetStatusColorType;
}

export function codeToStatusCase(value: number | undefined): StatusCase {
  let ret: StatusCase = {
    color: 'yellow',
    tulis: 'Not Found',
    loading: false,
    status: 'default',
  };

  switch (value) {
    case 0:
      ret = {
        color: 'blue',
        tulis: 'New',
        loading: false,
        status: 'default',
      };
      return ret;
    case 1:
      ret = {
        color: 'gold',
        tulis: 'Recon',
        loading: false,
        status: 'processing',
      };
      return ret;
    case 2:
      ret = {
        color: 'gold',
        tulis: 'Process',
        loading: false,
        status: 'processing',
      };
      return ret;
    case 3:
      ret = {
        color: 'geekblue',
        tulis: 'Ready',
        loading: true,
        status: 'warning',
      };
      return ret;
    case 4:
      ret = {
        color: 'green',
        tulis: 'Send',
        loading: true,
        status: 'success',
      };
      return ret;
    case 100:
      ret = {
        color: 'orange',
        tulis: 'Error',
        loading: false,
        status: 'error',
      };
      return ret;
    case 101:
      ret = {
        color: 'red',
        tulis: 'Error Recon',
        loading: false,
        status: 'error',
      };
      return ret;
    case 102:
      ret = {
        color: 'red',
        tulis: 'Error Procs',
        loading: false,
        status: 'error',
      };
    case 104:
      ret = {
        color: 'red',
        tulis: 'Reject',
        loading: false,
        status: 'error',
      };
      return ret;
      return ret;
    default:
      return ret;
  }
}

export const StatusFilter = {
  0: { text: 'New', status: 'Default' },
  1: { text: 'Recon', status: 'Processing' },
  2: { text: 'Process', status: 'Processing' },
  3: { text: 'Ready', status: 'Warning' },
  4: { text: 'Send', status: 'Success' },
  100: { text: 'Error', status: 'Error' },
  101: { text: 'Error Recon', status: 'Error' },
  102: { text: 'Error Procs', status: 'Error' },
  104: { text: 'Reject', status: 'Error' },
};
