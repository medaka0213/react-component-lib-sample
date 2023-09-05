/* eslint-disable */
import moment from 'moment-timezone';
import 'moment/locale/ja';

export function zeroPadding(num: number, length: number): string {
  return (Array(length).join('0') + num).slice(-length);
}

export function get_end_time(months: number): string {
  const res: any = moment.utc();
  res.set({
    month: res.month() + months,
    date: 0,
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 999,
  });
  return res.format('YYYY-MM-DDTHH:mm:ss');
}

export function time_between(
  mode: string = 'upcoming',
  months: number = 3
): string[] {
  let start: any = moment.utc().format('YYYY-MM-DDTHH:mm:ss');
  let end: any = moment.utc();
  if (mode == 'upcoming') {
    end.set({
      month: end.month() + months,
      date: 0,
      hour: 23,
      minute: 59,
      second: 59,
      millisecond: 999,
    });
    return [start, end.format('YYYY-MM-DDTHH:mm:ss')];
  } else {
    end.set({
      month: end.month() - months,
      date: 0,
      hour: 23,
      minute: 59,
      second: 59,
      millisecond: 999,
    });
    return [end.format('YYYY-MM-DDTHH:mm:ss'), start];
  }
}

function get_day_jp(dt: Date): string {
  let day = moment(dt).format('e');
  if (day == '0') {
    day = '日';
  } else if (day == '1') {
    day = '月';
  } else if (day == '2') {
    day = '火';
  } else if (day == '3') {
    day = '水';
  } else if (day == '4') {
    day = '木';
  } else if (day == '5') {
    day = '金';
  } else if (day == '6') {
    day = '土';
  }
  return day;
}

export function format_datetime_JP(datetime: string): string {
  const dt = moment(datetime + 'Z')
    .tz('Asia/Tokyo')
    .locale('ja');
  let res = dt.format(`M/D(${get_day_jp(new Date(datetime))}) HH:mm`);
  return res;
}

export function format_countdown(datetime: string): string {
  let dt = moment(datetime + 'Z');
  let res: string = '';

  let diff = dt.diff(moment().utc());
  let duration = moment.duration(diff);

  let years = Math.abs(duration.years());
  let months = Math.abs(duration.months());
  let days = Math.abs(duration.days());
  let hours = zeroPadding(Math.abs(duration.hours()), 2);
  let minutes = zeroPadding(Math.abs(duration.minutes()), 2);
  let seconds = zeroPadding(Math.abs(duration.seconds()), 2);

  if (duration.asMilliseconds() < 0) {
    res = 'T + ';
  } else {
    res = 'T - ';
  }

  if (years > 0) {
    res += years + '年 ';
  }
  if (months > 0) {
    res += months + 'ヶ月 ';
  }
  if (days > 0) {
    res += days + '日 ';
  }
  res += `${hours}:${minutes}:${seconds}`;

  return res;
}

export const moment_to_dict = (dt: moment.Moment) => {
  return {
    year: dt.year(),
    month: dt.month() + 1,
    date: dt.date(),
    hour: dt.hour(),
    minute: dt.minute(),
    second: dt.second(),
    date_string: dt.format('YYYY-MM-DD'),
    time_string: dt.format('HH:mm'),
    time_string_lts: dt.format('HH:mm:ss'),
    time_string_iso: dt.toISOString(),
    raw_data: dt,
  };
};

// カウントダウン関連
export const cowntdown_time = (
  iso_time: string,
  delta_t = { hours: 0, minutes: 0, seconds: 0 },
  is_T_minus: boolean = true,
  locale: string = 'ja'
) => {
  var dt = moment(String(iso_time + 'Z')).tz('Asia/Tokyo');

  if (is_T_minus) {
    dt.subtract(delta_t);
  } else {
    dt.add(delta_t);
  }

  if (locale !== 'ja') {
    dt.tz('Etc/GMT').locale('en');
  }

  return moment_to_dict(dt);
};

export const format_timedelta = (_seconds: number): string => {
  const hours =
    Math.floor(_seconds / 3600)
      .toString()
      .padStart(2, '0') || '00';
  const minutes =
    Math.floor((_seconds % 3600) / 60)
      .toString()
      .padStart(2, '0') || '00';
  const seconds =
    Math.floor(_seconds % 60)
      .toString()
      .padStart(2, '0') || '00';
  return `${hours}:${minutes}:${seconds}`;
};

export const deformate_timedelta = (time: string): number => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};
