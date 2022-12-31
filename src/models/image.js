import { Record } from "immutable";

const keys = [
  "pk", "sk", "name","unique",
  //search keys
  "credit", "url", "user", "title",

  "created_at", "updated_at",
  "dataUri", "mime", "extension",
  "description", "description_JP"
]

function setCollection (){
  let result = {}
  for (let key of keys){
    result[key] = null
  }
  return result
}
export const eventCollection = setCollection()

export class Image extends Record(eventCollection) {
  data() {
    let result = {}
    for (let key of keys) {
        let _value = this[key] || ""
        if (_value != "") result[key] = _value
    }
    return result
  }

  alt(){
    return this.title || this.name || this.unique || this.pk
  }

  storageLink() {
    if (this.extension){
      return `https://img.virtualrocketwatching.net/image/${this.pk}.${this.extension}`
    } else {
      let extention = this.mime  || ""
      if (~extention.indexOf("/")) extention = this.mime.split("/")[1]
      return `https://img.virtualrocketwatching.net/image/${this.pk}.${extention}`
    }
  }

  markdown(alt=null) {
    return `![${alt || this.alt()}](${this.storageLink()})\n`
  }

  markdownWithCredit (alt=null){
    return this.markdown(alt) + `Credit: ${this.credit}\n`
  }

  marp(alt="bg left vertical") {
    return this.markdown(alt)
  }

  marpWithCredit (alt="bg left vertical fit"){
    return this.marp(alt) + `\n<!--\n_footer: "Image: ${this.credit}"\n-->\n`
  }

  isPicture() {
    if (this.mime){
      return this.mime.startsWith("image/")
    } else {
      return false
    }
  }
}