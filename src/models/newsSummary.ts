import { BaseModel, Fields } from './baseModel';

export class NewsSummary extends BaseModel {
  public readonly url: string = '';
  public readonly news_source: string = '';
  public readonly title: string = '';
  public readonly title_JP: string = '';
  public readonly content: string = '';
  public readonly summary: string = '';
  public readonly published: string = '';
  public readonly created_at: string = '';
  public readonly updated_at: string = '';
  public readonly misskey_id: string = '';

  constructor(props: Fields<NewsSummary>) {
    super(props);
    Object.assign(this, props);
  }

  misskeyLink(): string {
    return 'https://misskey.virtualrocketwatching.net/' + this.misskey_id;
  }
}
