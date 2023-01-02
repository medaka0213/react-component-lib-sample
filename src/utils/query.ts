export type SearchMode = {
  label: string;
  value: string;
  nValues: number;
  toParam: (value0: any, value1?: any) => string;
};

export const SearchModeList: SearchMode[] = [
  {
    label: '先頭一致',
    value: 'BEGINS',
    nValues: 1,
    toParam: (value0: any, value1?: any) => `${value0}*`,
  },
  {
    label: '等しい',
    value: 'EQ',
    nValues: 1,
    toParam: (value0: any, value1?: any) => `${value0}`,
  },
  {
    label: '以下',
    value: 'LT_E',
    nValues: 1,
    toParam: (value0: any, value1?: any) => `...${value0}`,
  },
  {
    label: '以上',
    value: 'GT_E',
    nValues: 1,
    toParam: (value0: any, value1?: any) => `${value0}...`,
  },
  {
    label: 'より小さい',
    value: 'LT',
    nValues: 1,
    toParam: (value0: any, value1?: any) => `..${value0}`,
  },
  {
    label: 'より大きい',
    value: 'GT',
    nValues: 1,
    toParam: (value0: any, value1?: any) => `${value0}..`,
  },
  {
    label: '範囲',
    value: 'BEGINS',
    nValues: 2,
    toParam: (value0: any, value1?: any) => `${value0}...${value1}`,
  },
  {
    label: '含む',
    value: 'CONTAINS',
    nValues: 1,
    toParam: (value0: any, value1?: any) => `*${value0}*`,
  },
  {
    label: '等しくない',
    value: 'N_EQ',
    nValues: 1,
    toParam: (value0: any, value1?: any) => `--${value0}`,
  },
  {
    label: '値が保存されている',
    value: 'EX',
    toParam: (value0: any, value1?: any) => `*`,
    nValues: 0,
  },
  {
    label: '値が保存されていない',
    value: 'N_EX',
    toParam: (value0: any, value1?: any) => `--`,
    nValues: 0,
  },
];

export const ParamToSeachMode = (param: string): SearchMode => {
  if (param.startsWith('"') && param.endsWith('"')) {
    // 文字列の場合はダブルクォーテーションを削除
    param = param.slice(1, -1);
  }

  if (param === '*') {
    return SearchModeList.filter((mode) => mode.value === 'EX')[0];
  } else if (param === '--') {
    return SearchModeList.filter((mode) => mode.value === 'N_EX')[0];
  } else if (param.startsWith('...')) {
    return SearchModeList.filter((mode) => mode.value === 'LT_E')[0];
  } else if (param.startsWith('..')) {
    return SearchModeList.filter((mode) => mode.value === 'LT')[0];
  } else if (param.endsWith('...')) {
    return SearchModeList.filter((mode) => mode.value === 'GT_E')[0];
  } else if (param.endsWith('..')) {
    return SearchModeList.filter((mode) => mode.value === 'GT')[0];
  } else if (param.startsWith('--')) {
    return SearchModeList.filter((mode) => mode.value === 'N_EQ')[0];
  } else if (param.startsWith('*')) {
    return SearchModeList.filter((mode) => mode.value === 'CONTAINS')[0];
  } else if (param.endsWith('*')) {
    return SearchModeList.filter((mode) => mode.value === 'BEGINS')[0];
  } else if (param.indexOf('...') != -1) {
    return SearchModeList.filter((mode) => mode.value === 'BETWEEN')[0];
  } else {
    return SearchModeList.filter((mode) => mode.value === 'EQ')[0];
  }
};
