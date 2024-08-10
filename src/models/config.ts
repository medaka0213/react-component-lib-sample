import { BaseModel, Fields } from './baseModel';

export class Config extends BaseModel {
  public readonly unique: string = '';
  public readonly search_keys: string[] = [];
  public readonly display_keys: string[] = [];
  public readonly rel_types: string[] = [];
  public readonly unique_rel_types: string[] = [];
  public readonly version: number = 1;

  constructor(props: Fields<Config>) {
    super(props);
    Object.assign(this, props);
  }
}
