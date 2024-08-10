import { BaseModel, Fields } from './baseModel';
import { extractIdFromUrl, isYoutubeUrl, isTwitterUrl } from '../utils/string';

import moment from 'moment-timezone';
import 'moment/locale/ja';

export class Event extends BaseModel {
  public readonly NextSpaceFlight: string = '';
  public readonly name: string = '';
  public readonly name_JP: string = '';
  public readonly datetime: string = '';
  public readonly datetime_format: string = '';
  public readonly datetime_format_JP: string = '';
  public readonly datetime_time_type: string = '';
  public readonly datetime_date_type: string = '';
  public readonly datetime_isNET!: boolean;

  public readonly overview: string = '';
  public readonly overview_JP: string = '';
  public readonly description: string = '';
  public readonly description_JP: string = '';
  public readonly rocket_image_url: string = '';

  public readonly slide: string = '';

  public readonly image_url: string = '';
  public readonly image_credit: string = '';

  public readonly watch_URL: string = '';
  public readonly watch_URL_short: string = '';
  public readonly watch_URL_option: string = '';
  public readonly watch_URL_liftoff_at!: number;

  public readonly tweet: string = '';
  public readonly tweet_JP: string = '';
  public readonly misskey: string = '';
  public readonly misskey_JP: string = '';

  constructor(props: Fields<Event>) {
    super(props);
    Object.assign(this, props);
  }
}
