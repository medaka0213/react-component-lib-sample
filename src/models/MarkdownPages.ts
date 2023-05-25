import { Fields } from './baseModel';

export class MarkdownPages {
  public text: string = '';
  public pages: string[] = [];

  constructor(props: Fields<MarkdownPages>) {
    Object.assign(this, props);
    this.parseText();
  }

  static fromText(text: string) {
    //pageの抽出
    let pages = text.split(/\n\n-{3,}\n/g);

    return new MarkdownPages({ text, pages });
  }

  parseText() {
    this.pages = this.text.split(/\n\n-{3,}\n/g);
  }

  genText() {
    this.text = this.pages?.join('\n\n---\n');
    return this.text;
  }

  reset() {
    this.genText();
    this.parseText();
  }

  addPage(index: number, text = '') {
    this.pages?.splice(index + 1, 0, text);
    this.reset();
  }
  deletePage(index: number) {
    this.pages?.splice(index, 1);
    this.reset();
  }

  changePage(index: number, text: string) {
    this.pages[index] = text;
    this.reset();
  }

  toPagesObj(prefix = 'md_page_') {
    let res: any = {};
    for (let i = 0; i < this.pages.length; i++) {
      res[prefix + i] = this.pages[i];
    }
    return res;
  }

  fromPagesObj(data: any = {}, prefix = 'md_page_') {
    let res: string[] = [];
    for (let i = 0; i < this.pages.length; i++) {
      res.push(data[prefix + i]);
    }
    this.pages = res;
    this.reset();
  }
}
