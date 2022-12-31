import { Fields, BaseModel } from './baseModel';

export class SlideText extends BaseModel {
  public readonly slide: string = '';
  public readonly texts: string[] = [];

  constructor(props: Fields<SlideText>) {
    super(props);
    Object.assign(this, props);
  }

  textsFormValues() {
    let result: any = {};
    if (this.texts) {
      this.texts.forEach((t, i) => {
        result[`text_page_${i}`] = t;
      });
      return result;
    }
  }
  formValues2texts(values: any) {
    let result = [];
    let keys = Object.keys(values).filter((k) => k.startsWith('text_page_'));
    for (let i = 0; i <= keys.length - 1; i++) {
      result.push(values[`text_page_${i}`] || '');
    }
    return result;
  }
}
