import { BaseModel, Fields } from './baseModel';
import { sort_array } from '../utils/sort';

export class Countdown extends BaseModel {
  public readonly launch!: string;
  public readonly event!: string;

  public readonly created!: string;
  public readonly updated!: string;
  public readonly description!: string;
  public readonly name!: string;

  public readonly t_plus!: any[];
  public readonly t_minus!: any[];

  constructor(props: Fields<Countdown>) {
    super(props);
    Object.assign(this, props);
  }

  set_timeline(key: 't_plus' | 't_minus', timeline: any[]): Countdown {
    timeline = sort_array(timeline, ['hours', 'minutes', 'seconds']);
    return new Countdown({
      ...this,
      [key]: timeline,
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
}
