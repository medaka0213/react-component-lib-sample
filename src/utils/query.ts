export type QueryItem = {
  key: string;
  value0: string | number;
  value1: string | number;
  enabled: boolean;
  mode: string;
  type: 'number' | 'string' | 'datetime';
};

export type SearchMode = {
  label: string;
  value: string;
  nValues: number;
  toParam: (q: QueryItem) => string;
};

export const SearchModeList: SearchMode[] = [
  {
    label: '先頭一致',
    value: 'BEGINS',
    nValues: 1,
    toParam: ({ value0, value1 }) => `${value0}*`,
  },
  {
    label: '等しい',
    value: 'EQ',
    nValues: 1,
    toParam: ({ value0, value1 }) => `${value0}`,
  },
  {
    label: '以下',
    value: 'LT_E',
    nValues: 1,
    toParam: ({ value0, value1 }) => `...${value0}`,
  },
  {
    label: '以上',
    value: 'GT_E',
    nValues: 1,
    toParam: ({ value0, value1 }) => `${value0}...`,
  },
  {
    label: 'より小さい',
    value: 'LT',
    nValues: 1,
    toParam: ({ value0, value1 }) => `..${value0}`,
  },
  {
    label: 'より大きい',
    value: 'GT',
    nValues: 1,
    toParam: ({ value0, value1 }) => `${value0}..`,
  },
  {
    label: '範囲',
    value: 'BETWEEN',
    nValues: 2,
    toParam: ({ value0, value1 }) => `${value0}...${value1}`,
  },
  {
    label: '含む',
    value: 'CONTAINS',
    nValues: 1,
    toParam: ({ value0, value1 }) => `*${value0}*`,
  },
  {
    label: '等しくない',
    value: 'N_EQ',
    nValues: 1,
    toParam: ({ value0, value1 }) => `--${value0}`,
  },
  {
    label: '値が保存されている',
    value: 'EX',
    toParam: ({ value0, value1 }) => `*`,
    nValues: 0,
  },
  {
    label: '値が保存されていない',
    value: 'N_EX',
    toParam: ({ value0, value1 }) => `--`,
    nValues: 0,
  },
];

export const GetSearchMode = (value: string): SearchMode => {
  // valueがラベルか値か判定して、SearchModeを返す
  let res = SearchModeList.filter((mode) => mode.value === value);
  if (res.length > 0) {
    return res[0];
  } else {
    res = SearchModeList.filter((mode) => mode.label === value);
    if (res.length > 0) {
      return res[0];
    }
  }
  return SearchModeList.filter((mode) => mode.value === 'EQ')[0];
};

export const ParamToSearchMode = (param: string): SearchMode => {
  if (param.startsWith('"') && param.endsWith('"')) {
    // 文字列の場合はダブルクォーテーションを削除
    param = param.slice(1, -1);
  }

  let res: SearchMode;
  if (param === '*') {
    res = GetSearchMode('EX');
  } else if (param === '--') {
    res = GetSearchMode('N_EX');
  } else if (param.startsWith('...')) {
    res = GetSearchMode('LT_E');
  } else if (param.startsWith('..')) {
    res = GetSearchMode('LT');
  } else if (param.endsWith('...')) {
    res = GetSearchMode('GT_E');
  } else if (param.endsWith('..')) {
    res = GetSearchMode('GT');
  } else if (param.startsWith('--')) {
    res = GetSearchMode('N_EQ');
  } else if (param.startsWith('*')) {
    res = GetSearchMode('CONTAINS');
  } else if (param.endsWith('*')) {
    res = GetSearchMode('BEGINS');
  } else if (param.indexOf('...') != -1) {
    res = GetSearchMode('BETWEEN');
  } else {
    res = GetSearchMode('EQ');
  }
  return res;
};

export const ParamToQueryItem = (param: string): QueryItem => {
  const searchMode = ParamToSearchMode(param);
  const key = param.split('=')[0];
  const keyItem = SearchModeList.filter((mode) => mode.value === key)[0];
  const value = param.split('=')[1];
  if (param === '*') {
    return {
      key,
      value0: '',
      value1: '',
      enabled: true,
      mode: searchMode.value,
      type: 'string',
    };
  } else if (param === '--') {
    return {
      key,
      value0: '',
      value1: '',
      enabled: true,
      mode: searchMode.value,
      type: 'string',
    };
  } else if (searchMode.value === 'BETWEEN') {
    const value0 = value.split('...')[0];
    const value1 = value.split('...')[1];
    return {
      key,
      value0,
      value1,
      enabled: true,
      mode: searchMode.value,
      type: 'string',
    };
  } else if (searchMode.value === 'LT_E') {
    const value0 = value.split('...')[1];
    return {
      key,
      value0,
      value1: '',
      enabled: true,
      mode: searchMode.value,
      type: 'string',
    };
  } else if (searchMode.value === 'LT') {
    const value0 = value.split('..')[1];
    return {
      key,
      value0,
      value1: '',
      enabled: true,
      mode: searchMode.value,
      type: 'string',
    };
  } else if (searchMode.value === 'GT_E') {
    const value0 = value.split('...')[0];
    return {
      key,
      value0,
      value1: '',
      enabled: true,
      mode: searchMode.value,
      type: 'string',
    };
  } else if (searchMode.value === 'GT') {
    const value0 = value.split('..')[0];
    return {
      key,
      value0,
      value1: '',
      enabled: true,
      mode: searchMode.value,
      type: 'string',
    };
  } else if (searchMode.value === 'N_EQ') {
    const value0 = value.split('--')[1];
    return {
      key,
      value0,
      value1: '',
      enabled: true,
      mode: searchMode.value,
      type: 'string',
    };
  } else if (searchMode.value === 'CONTAINS') {
    const value0 = value.split('*')[1];
    return {
      key,
      value0,
      value1: '',
      enabled: true,
      mode: searchMode.value,
      type: 'string',
    };
  } else if (searchMode.value === 'BEGINS') {
    const value0 = value.split('*')[0];
    return {
      key,
      value0,
      value1: '',
      enabled: true,
      mode: searchMode.value,
      type: 'string',
    };
  } else {
    return {
      key,
      value0: value,
      value1: '',
      enabled: true,
      mode: searchMode.value,
      type: 'string',
    };
  }
};

export const SearchModeToParam = (qruery: QueryItem): string => {
  const searchMode = GetSearchMode(qruery.mode);
  const param = searchMode.toParam({
    type: qruery.type,
    mode: qruery.mode,
    key: qruery.key,
    value0:
      qruery.type === 'string' || qruery.type === 'datetime'
        ? `"${qruery.value0}"`
        : qruery.value0,
    value1:
      qruery.type === 'string' || qruery.type === 'datetime'
        ? `"${qruery.value1}"`
        : qruery.value1,
    enabled: qruery.enabled,
  });
  return qruery.key + '=' + param;
};
