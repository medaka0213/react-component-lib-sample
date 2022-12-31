const pageSettings = `---
marp: true
paginate: true
---
`

const pageStyle = `
<style>
    p, table, ul {
        font-size: 18px;
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
</style>
`

function extractText(target, regex){
    const match = target.match(regex)
    if (match){
        return {
            text: match[0],
            rest: target.replace(match[0], "")
        }
    }
    return {
        text: "",
        rest: target
    }
}


export class MarkdownPages {
  constructor(text="") {
    this.text = text;
    this.parseText();
  }

  parseText() {
    let _text = this.text 

    //settingsの抽出
    let settingsEx = extractText(_text, /-{3,}\n([^(---)]+)-{3,}\n/g);
    this.marpSettings = settingsEx.text;
    if (this.marpSettings !== ""){
      this.marpSettings = this.marpSettings.replace(/-{3,}\n/g, "");
      this.marpSettings = this.marpSettings.replace(/\n{2,}/g, "\n")
    }
    if (this.marpSettings === ""){
      this.marpSettings = pageSettings
    }
    if (this.marpSettings.endsWith("\n")){
      this.marpSettings = this.marpSettings.slice(0, -1)
    }
    _text = settingsEx.rest;

    //styleの抽出
    let styleEx = extractText(_text, /<style>([^(<\/)]+)<\/style>\n/g);
    this.marpStyle = styleEx.text;
    if (this.marpStyle === ""){
      this.marpStyle = pageStyle
    }

    _text = styleEx.rest;

    //pageの抽出
    this.pages = _text.split(/\n\n-{3,}\n/g);
  }

  genText() {
    this.text =  "---\n" + this.marpSettings + "\n---\n" + this.marpStyle + this.pages.join("\n\n---\n");
    return this.text;
  }

  reset(){
    this.genText();
    this.parseText()
  }

  addPage(index, text="") {
    this.pages.splice(index+1, 0, text);
    this.reset()
  }
  deletePage(index) {
    this.pages.splice(index, 1);
    this.reset()
  }

  changePage(index, text){
    this.pages[index] = text;
    this.reset()
  }

  setStyle(style) {
    this.marpStyle = style;
    this.reset()
  }
  setSettings(settings) {
    this.marpSettings = settings;
    this.reset()
  }

  toPagesObj(prefix= "md_page_"){
    let res = {}
    for (let i = 0; i < this.pages.length; i++){
      res[prefix + i] = this.pages[i]
    }
    return res
  }

  fromPagesObj(data={}, prefix= "md_page_"){
    let res = []
    for (let i = 0; i < this.pages.length; i++){
      res.push(data[prefix + i])
    }
    this.pages = res
    this.reset()
  }
}