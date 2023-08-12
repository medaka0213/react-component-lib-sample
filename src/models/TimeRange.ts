import { Fields } from './baseModel';

import moment from 'moment-timezone';
import 'moment/locale/ja';

import { SearchMode, QueryItem, ParamToQueryItem } from '../utils/query';

export enum DatetimeSearchMode {
  CUSTOM_BETWEEN = 'BETWEEN',
  CUSTOM_AFTER = 'GT_E',
  CUSTOM_BEFORE = 'LT_E',
  WEEK_TEIKI = 'WEEK_TEIKI',
  DAY_UTC = 'DAY_UTC',
  DAY_JST = 'DAY_JST',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
  QUARTER = 'QUARTER',
  DISABLED = 'EX', //値が保存されているとして扱う
}

export class TimeRange {
  public readonly start!: string;
  public readonly end!: string;
  public readonly mode!: string;

  constructor(props: Fields<TimeRange>) {
    Object.assign(this, {
      start: props.start || '',
      end: props.end || '',
      mode: props.mode || DatetimeSearchMode.CUSTOM_BETWEEN,
    });
  }

  // 文字列から生成
  static fromString(str: string = ''): TimeRange {
    let data: QueryItem = ParamToQueryItem(str);
    console.log('fromString', str, data);

    if (data.mode === 'BETWEEN') {
      return new TimeRange({
        start: String(data.value0),
        end: String(data.value1),
        mode: parseMode(String(data.value0), String(data.value1)),
      });
    } else if (data.mode === 'EQ') {
      return new TimeRange({
        start: String(data.value0),
        end: String(data.value0),
        mode: DatetimeSearchMode.CUSTOM_BETWEEN,
      });
    } else if (data.mode === 'GT' || data.mode === 'GT_E') {
      return new TimeRange({
        start: String(data.value0),
        end: String(data.value0),
        mode: DatetimeSearchMode.CUSTOM_AFTER,
      });
    } else if (data.mode === 'LT' || data.mode === 'LT_E') {
      return new TimeRange({
        start: String(data.value0),
        end: String(data.value0),
        mode: DatetimeSearchMode.CUSTOM_BEFORE,
      });
    } else {
      return new TimeRange({
        start: '',
        end: '',
        mode: DatetimeSearchMode.DISABLED,
      });
    }
  }

  // モードから期間を生成
  static fromMode(
    dt: Date | string,
    mode: string,
    dt2: Date | string = new Date()
  ): TimeRange {
    let start = moment(dt);
    let end = moment(dt);
    switch (mode) {
      case DatetimeSearchMode.DAY_UTC:
        start = moment(dt).tz('UTC').startOf('day');
        end = moment(dt).tz('UTC').startOf('day').add(1, 'day');
        break;
      case DatetimeSearchMode.DAY_JST:
        start = moment(dt).tz('UTC').startOf('day').add(9, 'hours');
        end = moment(dt).tz('UTC').startOf('day').add(1, 'day').add(9, 'hours');
        break;
      case DatetimeSearchMode.WEEK_TEIKI:
        start = moment(dt).startOf('week').add(1, 'day');
        start.set('hour', 12);
        end = moment(dt).add(1, 'week').startOf('week').add(1, 'day');
        end.set('hour', 15);
        if (start.isAfter(dt)) {
          start = start.subtract(1, 'week');
          end = end.subtract(1, 'week');
        }
        break;
      case DatetimeSearchMode.WEEK:
        start = moment(dt).startOf('week');
        end = moment(dt).add(1, 'week').startOf('week');
        break;
      case DatetimeSearchMode.MONTH:
        start = moment(dt).startOf('month');
        end = moment(dt).add(1, 'month').startOf('month');
        break;
      case DatetimeSearchMode.YEAR:
        start = moment(dt).startOf('year');
        end = moment(dt).add(1, 'year').startOf('year');
        break;
      case DatetimeSearchMode.QUARTER:
        start = moment(dt).startOf('quarter');
        end = moment(dt).add(1, 'quarter').startOf('quarter');
        break;
      case DatetimeSearchMode.CUSTOM_BETWEEN:
        start = moment(dt);
        end = moment(dt2);
        mode = parseMode(
          start.format('YYYY-MM-DDTHH:mm:ss'),
          end.format('YYYY-MM-DDTHH:mm:ss')
        );
        break;
      case DatetimeSearchMode.CUSTOM_AFTER:
        start = moment(dt);
        end = moment(dt);
        break;
      case DatetimeSearchMode.CUSTOM_BEFORE:
        start = moment(dt);
        end = moment(dt);
        break;
      default:
        return new TimeRange({
          start: '',
          end: '',
          mode: DatetimeSearchMode.DISABLED,
        });
    }
    return new TimeRange({
      start: start.format('YYYY-MM-DDTHH:mm:ss'),
      end: end.format('YYYY-MM-DDTHH:mm:ss'),
      mode: mode,
    });
  }

  // 次の範囲
  next(): TimeRange {
    switch (this.mode) {
      case DatetimeSearchMode.DAY_UTC:
        return TimeRange.fromMode(
          moment(this.start).add(1, 'days').toDate(),
          DatetimeSearchMode.DAY_UTC
        );
      case DatetimeSearchMode.DAY_JST:
        return TimeRange.fromMode(
          moment(this.start).add(1, 'days').toDate(),
          DatetimeSearchMode.DAY_JST
        );
      case DatetimeSearchMode.WEEK_TEIKI:
        return TimeRange.fromMode(
          moment(this.start).add(1, 'weeks').toDate(),
          DatetimeSearchMode.WEEK_TEIKI
        );
      case DatetimeSearchMode.WEEK:
        return TimeRange.fromMode(
          moment(this.start).add(1, 'weeks').toDate(),
          DatetimeSearchMode.WEEK
        );
      case DatetimeSearchMode.MONTH:
        return TimeRange.fromMode(
          moment(this.start).add(1, 'months').toDate(),
          DatetimeSearchMode.MONTH
        );
      case DatetimeSearchMode.YEAR:
        return TimeRange.fromMode(
          moment(this.start).add(1, 'years').toDate(),
          DatetimeSearchMode.YEAR
        );
      case DatetimeSearchMode.QUARTER:
        return TimeRange.fromMode(
          moment(this.start).add(1, 'quarters').toDate(),
          DatetimeSearchMode.QUARTER
        );
      case DatetimeSearchMode.CUSTOM_BETWEEN:
        let range = moment(this.end).diff(moment(this.start), 'days');
        return new TimeRange({
          start: moment(this.end).add(1, 'day').format('YYYY-MM-DDTHH:mm:ss'),
          end: moment(this.end)
            .add(range + 1, 'day')
            .format('YYYY-MM-DDTHH:mm:ss'),
          mode: DatetimeSearchMode.CUSTOM_BETWEEN,
        });
      default:
        return this;
    }
  }

  toString = (key: string = 'datetime', incl_key = true): string => {
    let value = '';
    if (this.mode === DatetimeSearchMode.CUSTOM_AFTER) {
      value = `${this.start}...`;
    } else if (this.mode === DatetimeSearchMode.CUSTOM_BEFORE) {
      value = `...${this.end}`;
    } else {
      value = `${this.start}...${this.end}`;
    }
    return incl_key ? `${key}=${value}` : value;
  };

  toQueryItem = (key: string = 'datetime'): QueryItem => {
    const { value0, value1 } = ParamToQueryItem(this.toString(key, false));
    return {
      key,
      value0,
      value1,
      mode: this.mode,
      enabled: this.mode !== DatetimeSearchMode.DISABLED,
      type: 'datetime',
    };
  };

  // 前の範囲
  prev(): TimeRange {
    switch (this.mode) {
      case DatetimeSearchMode.DAY_UTC:
        return TimeRange.fromMode(
          moment(this.start).add(-1, 'days').toDate(),
          DatetimeSearchMode.DAY_UTC
        );
      case DatetimeSearchMode.DAY_JST:
        return TimeRange.fromMode(
          moment(this.start).add(-1, 'days').toDate(),
          DatetimeSearchMode.DAY_JST
        );
      case DatetimeSearchMode.WEEK_TEIKI:
        return TimeRange.fromMode(
          moment(this.start).add(-1, 'weeks').toDate(),
          DatetimeSearchMode.WEEK_TEIKI
        );
      case DatetimeSearchMode.WEEK:
        return TimeRange.fromMode(
          moment(this.start).add(-1, 'weeks').toDate(),
          DatetimeSearchMode.WEEK
        );
      case DatetimeSearchMode.MONTH:
        return TimeRange.fromMode(
          moment(this.start).add(-1, 'months').toDate(),
          DatetimeSearchMode.MONTH
        );
      case DatetimeSearchMode.YEAR:
        return TimeRange.fromMode(
          moment(this.start).add(-1, 'years').toDate(),
          DatetimeSearchMode.YEAR
        );
      case DatetimeSearchMode.QUARTER:
        return TimeRange.fromMode(
          moment(this.start).add(-1, 'quarters').toDate(),
          DatetimeSearchMode.QUARTER
        );
      case DatetimeSearchMode.CUSTOM_BETWEEN:
        let range = moment(this.end).diff(moment(this.start), 'days');
        return new TimeRange({
          start: moment(this.start)
            .add(-range - 1, 'day')
            .format('YYYY-MM-DDTHH:mm:ss'),
          end: moment(this.start).add(-1, 'day').format('YYYY-MM-DDTHH:mm:ss'),
          mode: DatetimeSearchMode.CUSTOM_BETWEEN,
        });
      default:
        return this;
    }
  }

  now(): TimeRange {
    return TimeRange.fromMode(new Date(), String(this.mode), new Date());
  }
}

export const parseMode = (start: string, end: string): DatetimeSearchMode => {
  const isSame = (a: TimeRange, b: TimeRange): boolean => {
    return a.start === b.start && a.end === b.end;
  };
  const customRange = new TimeRange({
    start,
    end,
    mode: DatetimeSearchMode.CUSTOM_BETWEEN,
  });
  const targetModes = [
    DatetimeSearchMode.DAY_UTC,
    DatetimeSearchMode.DAY_JST,
    DatetimeSearchMode.WEEK_TEIKI,
    DatetimeSearchMode.WEEK,
    DatetimeSearchMode.MONTH,
    DatetimeSearchMode.YEAR,
    DatetimeSearchMode.QUARTER,
  ];
  for (const mode of targetModes) {
    const range = TimeRange.fromMode(new Date(customRange.start), mode);
    if (isSame(range, customRange)) {
      return mode;
    }
  }
  return DatetimeSearchMode.CUSTOM_BETWEEN;
};

const toParam = ({ key, value0, value1, mode }: QueryItem): string =>
  new TimeRange({
    start: String(value0),
    end: String(value1),
    mode,
  }).toString(key);

export const SearchModeListDatetime: SearchMode[] = [
  {
    label: 'を含む日 (国際標準時)',
    value: 'DAY_UTC',
    nValues: 1,
    toParam,
  },
  {
    label: 'を含む日 (日本時間)',
    value: 'DAY_JST',
    nValues: 1,
    toParam,
  },
  {
    label: 'を含む週 (定期集会用 月曜21時締め)',
    value: 'WEEK_TEIKI',
    nValues: 1,
    toParam,
  },
  {
    label: 'を含む週 (月曜0時締め)',
    value: 'WEEK',
    nValues: 1,
    toParam,
  },
  {
    label: 'を含む月',
    value: 'MONTH',
    nValues: 1,
    toParam,
  },
  {
    label: 'を含む四半期',
    value: 'QUARTER',
    nValues: 1,
    toParam,
  },
  {
    label: 'を含む年',
    value: 'YEAR',
    nValues: 1,
    toParam,
  },
  {
    label: '以前',
    value: 'LT_E',
    nValues: 1,
    toParam,
  },
  {
    label: '以後',
    value: 'GT_E',
    nValues: 1,
    toParam,
  },
  {
    label: '範囲指定',
    value: 'BETWEEN',
    nValues: 2,
    toParam,
  },
  {
    label: '値が保存されている',
    value: 'EX',
    nValues: 0,
    toParam,
  },
];
