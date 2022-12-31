import { Record } from "immutable";

const keys = [
  "pk", "sk", "unique",
  //search keys
  "content", "updated", "created", "user", "name"
]

function setCollection (){
  let result = {}
  for (let key of keys){
    result[key] = null
  }
  return result
}
export const eventCollection = setCollection()

export class Wiki extends Record(eventCollection) {
  notFound(){
    return !Boolean(this.pk) 
  }
  data() {
    let result = {}
    for (let key of keys) {
        let _value = this[key] || ""
        if (_value != "") result[key] = _value
    }
    return result
  }
  itemTypeName(){
    return "wiki"
  }
  itemPath(){
    return `/q/${this.itemTypeName()}/i/${this.pk}`
  }
  adminUrl(){
    return "https://admin.virtualrocketwatching.net" + this.itemPath()
  }
  get_jp_value(key) {
    return this[key + "_JP"] || this[key + "_jp"]  || this[key]
  }
}