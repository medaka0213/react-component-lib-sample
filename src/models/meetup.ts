import { BaseModel, Fields } from './baseModel';
import { format_datetime_JP } from '../utils/time';

export class Meetup extends BaseModel {
  public readonly missionID: string = '';
  public readonly title: string = '';
  public readonly title_JP: string = '';
  public readonly datetime: string = '';
  public readonly tweet: string = '';
  public readonly tweet_JP: string = '';
  public readonly tweet_postpone: string = '';
  public readonly misskey: string = '';
  public readonly misskey_JP: string = '';
  public readonly misskey_postpone: string = '';
  public readonly type: string = '';
  public readonly user: string = '';
  public readonly missionStartsAt: string = '';
  public readonly isCountDonDone?: boolean;
  public readonly isPosterDone?: boolean;
  public readonly isSlideDone?: boolean;
  public readonly isThumbDone?: boolean;
  public readonly isTweetDone?: boolean;
  public readonly isTwitterDone?: boolean;
  public readonly isMisskeyDone?: boolean;
  public readonly isVRCEveDone?: boolean;
  public readonly image_url: string = '';
  public readonly image_credit: string = '';
  public readonly calendar: string = '';
  public readonly launch: string = '';
  public readonly event: string = '';
  public readonly slide: string = '';

  constructor(props: Fields<Meetup>) {
    super(props);
    Object.assign(this, props);
  }
}
