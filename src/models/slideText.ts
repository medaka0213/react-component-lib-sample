import { Fields, BaseModel } from './baseModel';

export class SlideText extends BaseModel {
  public readonly slide: string = '';
  public readonly texts: string[] = [];

  constructor(props: Fields<SlideText>) {
    super(props);
    Object.assign(this, props);
  }
}
