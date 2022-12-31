import { BaseModel, Fields } from './baseModel';

export class Wiki extends BaseModel {
  public readonly name: string = '';
  public readonly user: string = '';
  public readonly content: string = '';
  public readonly created: string = '';
  public readonly updated: string = '';

  constructor(props: Fields<Wiki>) {
    super(props);
    Object.assign(this, props);
  }
}
