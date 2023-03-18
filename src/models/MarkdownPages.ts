import { Fields } from './baseModel';

const pageSettings = `---
marp: true
paginate: false
style: |
  p, ul {
    font-size: 18px;
  }
  table {
    font-size: 16px;
  }
  h1{
    font-size: 42px;
    padding: 10px 0;
    margin: 10px 0;
  }
  h2{
    font-size: 36px;
    padding: 10px 0;
    margin: 5px 0;
  }
  h3{
    font-size: 30px;
    padding: 10px 0;
    margin: 5px 0;
  }
  h4{
    font-size: 24px;
    padding: 10px 0;
    margin: 2px 0;
  }
  h5{
    font-size: 18px;
    padding: 10px 0;
    margin: 2px 0;
  }
---
`;

function extractText(target: string, regex: RegExp) {
  const match = target.match(regex);
  if (match) {
    return {
      text: match[0],
      rest: target.replace(match[0], ''),
    };
  }
  return {
    text: '',
    rest: target,
  };
}

export class MarkdownPages {
  public text: string = '';
  public pages: string[] = [];
  public marpSettings: string = pageSettings;

  constructor(props: Fields<MarkdownPages>) {
    Object.assign(this, props);
    this.parseText();
  }

  static fromText(_text: string) {
    let settingsEx = extractText(_text, /---([^(---)]+)---\n/g);

    let marpSettings = settingsEx.text;
    if (marpSettings === '') {
      marpSettings = pageSettings;
    }
    _text = settingsEx.rest;

    //pageの抽出
    let pages = _text.split(/\n\n-{3,}\n/g);

    return new MarkdownPages({
      text: _text,
      pages,
      marpSettings,
    });
  }

  parseText() {
    let _text = this.text;
    this.pages = _text.split(/\n\n-{3,}\n/g);
    if (this.pages[0].indexOf('marp:') !== -1) {
      const _splitted = this.pages[0].split('---');
      this.pages[0] = _splitted[_splitted.length - 1];
    }
  }

  genText() {
    this.text = this.marpSettings + this.pages?.join('\n\n---\n');
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

  setSettings(settings: string) {
    this.marpSettings = settings;
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
