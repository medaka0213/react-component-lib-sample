import { BaseModel, Fields } from './baseModel';

export class Image extends BaseModel {
  public readonly title: string = '';
  public readonly mime: string = '';
  public readonly credit: string = '';
  public readonly url: string = '';
  public readonly name: string = '';

  constructor(props: Fields<Image>) {
    super(props);
    Object.assign(this, props);
  }
}
