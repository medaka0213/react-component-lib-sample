import { BaseModel, Fields } from './baseModel';

export class NewsList extends BaseModel {
  public readonly name: string = '';
  public readonly news_list: any[] = [];
  public readonly created_at: string = '';
  public readonly updated_at: string = '';

  constructor(props: Fields<NewsList>) {
    super(props);
    Object.assign(this, props);
  }
}
