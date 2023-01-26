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

  constructor(props: Fields<Slide>) {
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
  imagePaths() {
    if (this.paths.length > 0) {
      return this.paths;
    } else if (this['data-length']) {
      let res = [];
      for (let i = 0; i < this['data-length']; i++) {
        res.push(`slide/${this.pk}/${('00000' + i).slice(-5)}.jpeg`);
      }
      return res;
    } else {
      return [];
    }
  }

  imageLinks() {
    if (this['data-length']) {
      return this.imagePaths().map(
        (path) => `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${path}`
      );
    } else {
      return [];
    }
  }
  imageLinksCached() {
    return this.imageLinks();
  }

  marpRef(start = 0, end = this['data-length'] - 1, includeCredit = false) {
    if (includeCredit) {
      return this.marpRefWithCredit(start, end);
    }
    let res = '';
    console.log('start', start);
    for (let i = start; i <= end; i++) {
      res += '---\n\n';
      res += `<!--スライド引用: \n${this.user} / ${this.name}\n-->\n\n`;
      res += `![bg fit](${this.imageLinksCached()[i]})\n\n`;
    }
    return res;
  }

  marpRefWithCredit(start = 0, end = this['data-length'] - 1) {
    let res = '';
    for (let i = start; i <= end; i++) {
      res += '---\n\n';
      res += `<!--スライド引用: \n${this.user} / ${this.name}\n-->\n\n`;
      res += `![bg h:85%](${this.imageLinksCached()[i]})\n\n`;
      res += `<!--\n_footer: "Credit: ${this.user}"\n-->\n\n`;
    }
    return res;
  }

  videoLink() {
    return `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/video/${this.pk}.mp4`;
  }

  videoLink2() {
    return `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/video/${this.pk}.mp4`;
  }
  videoLinkCached() {
    return `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/video/${this.pk}.mp4`;
  }
}
