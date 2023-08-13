import { BaseModel, Fields } from './baseModel';

export class YoutubeTranscript extends BaseModel {
  public readonly youtube_id: string = '';
  public readonly youtube_title: string = '';
  public readonly content_list: any[] = [];
  public readonly created_at: string = '';
  public readonly updated_at: string = '';

  constructor(props: Fields<YoutubeTranscript>) {
    super(props);
    Object.assign(this, props);
  }
}
