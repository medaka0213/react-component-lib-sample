import { BaseModel, Fields } from './baseModel';

export class TweeetSummary extends BaseModel {
  public readonly UserName: string = '';
  public readonly Name: string = '';
  public readonly CreatedAt: string = '';
  public readonly UpdatedAt: string = '';
  public readonly Text: string = '';
  public readonly LinlToTweet: string = '';
  public readonly StateId: string = '';
  public readonly Quoted: string = '';
  public readonly Retweeted: string = '';
  public readonly IsUserFollower: string[] = [];
  public readonly SelfUrls: string[] = [];
  public readonly Media: string[] = [];

  public readonly TextSummary: string = '';
  public readonly QuotedStatus: any = {};
  public readonly RetweetedStatus: any = {};
  public readonly InRreplyToStatus: any = {};
  public readonly misskey_id: string = '';

  constructor(props: Fields<TweeetSummary>) {
    super(props);
    Object.assign(this, props);
  }
}
