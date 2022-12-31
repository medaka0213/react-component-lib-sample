import { BaseModel, Fields } from './baseModel';

export class Image extends BaseModel {
  public readonly mime: string = '';
  public readonly credit: string = '';
  public readonly url: string = '';
  public readonly name: string = '';

  constructor(props: Fields<Image>) {
    super(props);
    Object.assign(this, props);
  }

  extention(): string {
    if (this.mime.indexOf('/') !== 0) {
      return this.mime.split('/')[1];
    } else {
      return this.mime;
    }
  }

  src(): string {
    return `https://img.virtualrocketwatching.net/image/${
      this.pk
    }.${this.extention()}`;
  }
}
