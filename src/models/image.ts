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

  extention(): string {
    let res = this.mime;
    if (res.indexOf('/') !== 0) {
      res = res.split('/')[1];
    }
    if (res.indexOf('+') !== 0) {
      res = res.split('+')[0];
    }
    return res;
  }

  src(): string {
    return `https://img.virtualrocketwatching.net/image/${
      this.pk
    }.${this.extention()}`;
  }

  alt() {
    return this.title || this.name || this.unique || this.pk;
  }

  filename() {
    let res = this.alt()
      .replace(/ /g, '_')
      .replace(/:/g, '_')
      .replace(/"/g, '_')
      .replace(/'/g, '_')
      .replace(/,/g, '_')
      .replace(/\./g, '_')
      .replace(/\(/g, '_');
    res = res + `.${this.extention()}`;
    return res;
  }

  markdown(alt: string = '') {
    return `![${alt || this.alt()}](${this.src()})\n`;
  }

  markdownWithCredit(alt: string = '') {
    return this.markdown(alt) + `Credit: ${this.credit}\n`;
  }

  marp(alt: string = 'bg left vertical') {
    return this.markdown(alt);
  }

  marpWithCredit(alt: string = 'bg left vertical fit') {
    return this.marp(alt) + `\n<!--\n_footer: "Image: ${this.credit}"\n-->\n`;
  }

  isPicture() {
    if (this.mime) {
      return this.mime.startsWith('image/');
    } else {
      return false;
    }
  }
}
