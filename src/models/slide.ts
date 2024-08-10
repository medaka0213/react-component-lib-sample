import { Fields, BaseModel } from './baseModel';

export class Slide extends BaseModel {
  public readonly type: string = '';
  public readonly name: string = '';
  public readonly user: string = '';
  public readonly ['created-at']: string = '';
  public readonly ['updated-at']: string = '';
  public readonly ['data-length']: number = 0;
  public readonly texts: string[] = [];
  public readonly paths: string[] = [];
  public readonly image_resolution: string = '';

  constructor(props: Fields<Slide>) {
    super(props);
    Object.assign(this, props);
  }
}
