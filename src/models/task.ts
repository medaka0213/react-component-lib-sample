import { BaseModel, Fields } from './baseModel';

export class Task extends BaseModel {
  public readonly launch: string = '';
  public readonly event: string = '';
  public readonly meetup: string = '';
  public readonly user: string = '';
  public readonly wiki: string = '';

  public readonly status: string = '';
  public readonly name: string = '';
  public readonly type: string = '';
  public readonly name_JP: string = '';
  public readonly description: string = '';

  public readonly warn: string = '';
  public readonly created: string = '';
  public readonly assigned: string = '';
  public readonly completed: string = '';
  public readonly confirmed: string = '';

  constructor(props: Fields<Task>) {
    super(props);
    Object.assign(this, props);
  }
}
