import { BaseModel } from './baseModel';
import { Launch } from './launch';
import { Event } from './event';
import { Config } from './config';
import { Slide } from './slide';
import { Meetup } from './meetup';
import { Countdown } from './countdown';
import { Image } from './image';
import { Wiki } from './wiki';
import { Task } from './task';
import { SlideText } from './slideText';
import { Rocket } from './rocket';
import { RocketSeries } from './rocketSeries';

export { BaseModel } from './baseModel';
export { Launch } from './launch';
export { Event } from './event';
export { Config } from './config';
export { Slide } from './slide';
export { Meetup } from './meetup';
export { Countdown } from './countdown';
export { Image } from './image';
export { Wiki } from './wiki';
export { Task } from './task';
export { SlideText } from './slideText';
export { Rocket } from './rocket';
export { RocketSeries } from './rocketSeries';
export { TimeRange } from './TimeRange';

export { ItemReducer } from './itemReducer';

const Models: any = {
  launch: Launch,
  event: Event,
  slide: Slide,
  meetup: Meetup,
  config: Config,
  countdown: Countdown,
  image: Image,
  wiki: Wiki,
  task: Task,
  'slide-text': SlideText,
  rocket: Rocket,
  rocketSeries: RocketSeries,
};

export function GetModel(type: string) {
  if (type in Models) {
    return Models[type];
  } else {
    return BaseModel;
  }
}

export function ParseItem(item: any): any {
  const type = item.sk.replace('_item', '');
  const Model = GetModel(type);
  return new Model(item);
}

export function ParseItemByTypes(items = []): any {
  let _res: any = {};
  let _items = items || [];
  _items.forEach((i: any) => {
    const type = i.sk.replace('_item', '');

    const Model = GetModel(type);
    i = new Model(i);

    if (type in _res) {
      _res[type].push(i);
    } else {
      _res[type] = [i];
    }
  });
  return _res;
}

export function ParseItemList(items = []): any[] {
  return items.map((i: any) => {
    const type = i.sk.replace('_item', '');
    const Model = GetModel(type);
    return new Model(i);
  });
}

export default Models;
