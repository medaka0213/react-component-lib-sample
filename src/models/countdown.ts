import { BaseModel, Fields } from './baseModel';
import { sort_array } from '../utils/sort';

import { cowntdown_time } from '../utils/time';

export class Countdown extends BaseModel {
  public readonly launch: string = '';
  public readonly event: string = '';

  public readonly created: string = '';
  public readonly updated: string = '';
  public readonly description: string = '';
  public readonly name: string = '';

  public readonly t_plus: any[] = [];
  public readonly t_minus: any[] = [];

  constructor(props: Fields<Countdown>) {
    let t_minus: any[] = props?.t_minus || [];
    t_minus = t_minus.map((e) => {
      return {
        ...e,
        hours: Number(e.hours || 0),
        minutes: Number(e.minutes || 0),
        seconds: Number(e.seconds || 0),
      };
    });
    let t_plus: any[] = props?.t_plus || [];
    t_plus = t_plus.map((e) => {
      return {
        ...e,
        hours: Number(e.hours || 0),
        minutes: Number(e.minutes || 0),
        seconds: Number(e.seconds || 0),
      };
    });
    super(Object.assign(props, { t_minus, t_plus }));
    Object.assign(this, Object.assign(props, { t_minus, t_plus }));
  }

  set_timeline(key: 't_plus' | 't_minus', timeline: any[]): Countdown {
    timeline = sort_array(timeline, ['hours', 'minutes', 'seconds']);
    return new Countdown({
      ...this,
      [key]: key === 't_minus' ? timeline.reverse() : timeline,
    });
  }
  add_timeline(key: 't_plus' | 't_minus', value: any) {
    let target = this;
    let timeline = target[key];
    timeline.push(value);
    return this.set_timeline(key, timeline);
  }
  remove_timeline(key: 't_plus' | 't_minus', index: number) {
    let target = this;
    let timeline = target[key];
    timeline.splice(index, 1);
    return this.set_timeline(key, timeline);
  }
  edit_timeline(key: 't_plus' | 't_minus', index: number, value: any) {
    let target = this;
    let timeline = target[key];
    timeline[index] = value;
    return this.set_timeline(key, timeline);
  }

  format(dt_utc: string) {
    let target = this;
    let t_plus = target.t_plus.map((e) => {
      return {
        td_str:
          String(e.hours).padStart(2, '0') +
          ':' +
          String(e.minutes).padStart(2, '0') +
          ':' +
          String(e.seconds).padStart(2, '0'),
        jst: cowntdown_time(dt_utc, e, false).time_string,
        utc: cowntdown_time(dt_utc, e, false, 'en').time_string,
        ...e,
      };
    });
    let t_minus = target.t_minus.map((e) => {
      return {
        td_str:
          String(e.hours).padStart(2, '0') +
          ':' +
          String(e.minutes).padStart(2, '0') +
          ':' +
          String(e.seconds).padStart(2, '0'),
        jst: cowntdown_time(dt_utc, e, true).time_string,
        utc: cowntdown_time(dt_utc, e, true, 'en').time_string,
        ...e,
      };
    });
    return {
      ...target,
      t_plus,
      t_minus,
    };
  }
}
