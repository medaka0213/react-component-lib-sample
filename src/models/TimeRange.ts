import { Fields } from './baseModel';

import moment from 'moment-timezone';
import 'moment/locale/ja';

import { SearchMode, QueryItem, ParamToQueryItem } from '../utils/query';

export enum DatetimeSearchMode {
  CUSTOM_BETWEEN = 'BETWEEN',
  CUSTOM_AFTER = 'GT_E',
  CUSTOM_BEFORE = 'LT_E',
  WEEK_TEIKI = 'WEEK_TEIKI',
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
  static fromMode(dt: Date, mode: string, dt2: Date = new Date()): TimeRange {
    console.log('fromMode', moment(dt), mode);
    let start = moment(dt);
    let end = moment(dt);
    switch (mode) {
      case DatetimeSearchMode.WEEK_TEIKI:
        console.log('WEEK_TEIKI');
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
        console.log('WEEK');
        start = moment(dt).startOf('week');
        end = moment(dt).add(1, 'week').startOf('week');
        break;
      case DatetimeSearchMode.MONTH:
        console.log('MONTH');
        start = moment(dt).startOf('month');
        end = moment(dt).add(1, 'month').startOf('month');
        break;
      case DatetimeSearchMode.YEAR:
        console.log('YEAR');
        start = moment(dt).startOf('year');
        end = moment(dt).add(1, 'year').startOf('year');
        break;
      case DatetimeSearchMode.QUARTER:
        console.log('QUARTER');
        start = moment(dt).startOf('quarter');
        end = moment(dt).add(1, 'quarter').startOf('quarter');
        break;
      case DatetimeSearchMode.CUSTOM_BETWEEN:
        console.log('CUSTOM_BETWEEN');
        start = moment(dt);
        end = moment(dt2);
        break;
      case DatetimeSearchMode.CUSTOM_AFTER:
        console.log('CUSTOM_AFTER');
        start = moment(dt);
        end = moment(dt);
        break;
      case DatetimeSearchMode.CUSTOM_BEFORE:
        console.log('CUSTOM_BEFORE');
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

  toString = (): string => {
    if (this.mode === DatetimeSearchMode.CUSTOM_AFTER) {
      return `${this.start}...`;
    } else if (this.mode === DatetimeSearchMode.CUSTOM_BEFORE) {
      return `...${this.end}`;
    }
    return `${this.start}...${this.end}`;
  };

  toQueryItem = (): QueryItem => {
    return ParamToQueryItem(this.toString());
  };

  // 前の範囲
  prev(): TimeRange {
    switch (this.mode) {
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

const parseMode = (start: string, end: string): DatetimeSearchMode => {
  const isSame = (a: TimeRange, b: TimeRange): boolean => {
    return a.start === b.start && a.end === b.end;
  };
  const customRange = new TimeRange({
    start,
    end,
    mode: DatetimeSearchMode.CUSTOM_BETWEEN,
  });
  const targetModes = [
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

const toParam = ({ value0, value1, mode }: QueryItem) =>
  new TimeRange({
    start: String(value0),
    end: String(value1),
    mode,
  }).toString();

export const DatetimeSearchModeListDatetime: SearchMode[] = [
  {
    label: 'を含む週 (定期集会用 月曜21時締め)',
    value: 'TEIKI_WEEK',
    nValues: 1,
    toParam,
  },
  {
    label: 'を含む週 (月曜0時締め)',
    value: 'WEEK_TEIKI',
    nValues: 1,
    toParam,
  },
  {
    label: 'を含む月',
    value: 'MONTHL',
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
