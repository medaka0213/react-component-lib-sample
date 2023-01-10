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
    return this._extract_yt_id(this.watch_URL_option || this.watch_URL || '');
  }

  youtubeShortId(): string {
    return this._extract_yt_id(this.watch_URL_short || '');
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

  missionTitle_EN_Short(): string {
    const event: any = this.data();
    if ((event.sk || '').startsWith('launch')) {
      return `${event.rocket || ''} | ${event.name}`;
    } else {
      return event.name;
    }
  }

  missionOverView_EN(): string {
    const event: any = this.data();
    return `${event.overview ? ', ' + event.overview : ''}`;
  }

  missionTitle_EN(isShort = true): string {
    if (!isShort) {
      return this.missionTitle_EN_Short() + this.missionOverView_EN();
    } else {
      return this.missionTitle_EN_Short();
    }
  }

  missionTitle_JP_Short(): string {
    const event: any = this.data();
    if (event.sk.startsWith('launch')) {
      return `${event.rocket_JP || event.rocket} | ${
        event.name_JP || event.name
      }`;
    } else {
      return event.name_JP || event.name;
    }
  }

  missionOverView_JP(): string {
    const event: any = this.data();
    return `${event.overview_JP ? ' (' + event.overview_JP + ')' : ''}`;
  }

  missionTitle_JP(isShort = true): string {
    if (!isShort) {
      return this.missionTitle_JP_Short() + this.missionOverView_JP();
    } else {
      return this.missionTitle_JP_Short();
    }
  }

  meetUpInfo() {
    return {
      title: this.missionTitle_EN(true),
      title_JP: this.missionTitle_JP(true),
      missionID: `${this.itemType()}_${this.unique}`,
    };
  }
}
