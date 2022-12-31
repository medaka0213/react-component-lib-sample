import { BaseModel, Fields } from './baseModel';

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

  public readonly image_url: string = '';
  public readonly image_credit: string = '';

  public readonly watch_URL: string = '';
  public readonly watch_URL_short: string = '';
  public readonly watch_URL_option: string = '';
  public readonly watch_URL_liftoff_at!: number;

  constructor(props: Fields<Event>) {
    super(props);
    Object.assign(this, props);
  }

  _extract_yt_id(url: string): string {
    if (url.includes('youtube.com')) {
      return url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be')) {
      return url.split('/')[3].split('&')[0];
    } else {
      return '';
    }
  }

  youtubeId(): string {
    return this._extract_yt_id(this.watch_URL_option || this.watch_URL);
  }

  youtubeShortId(): string {
    return this._extract_yt_id(this.watch_URL_short);
  }

  datetime_format_sort(): string {
    const dt = moment(this.datetime + 'Z');
    if (this.datetime_time_type == 'CONFIRMED') {
      return dt.format('YYYY-MM-DD HH:mm');
    } else if (this.datetime_date_type == 'CONFIRMED') {
      return dt.format('YYYY-MM-DD [XX:XX]');
    } else {
      return dt.format('YYYY-MM-[XX XX:XX]');
    }
  }

  nextSpaceFlightLink(): string {
    return `https://nextspaceflight.com/events`;
  }

  title(): string {
    return `${this.get_jp_value('name')}`;
  }
}
