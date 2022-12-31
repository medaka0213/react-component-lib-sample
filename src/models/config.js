import {
  Record
} from "immutable";

export class Config extends Record({
  unique: "unique",
  search_keys: [],
  display_keys: [],
  rel_types: [],
  unique_rel_types: []
}) {
  uniqueKey(){
    return this.unique || "unique"
  }
  displayKeys() {
    if (this.display_keys.length) {
      return this.display_keys
    }
    return this.search_keys || ["pk", "sk", "unique"]
  }

  createKeys () {
    const { unique, search_keys, display_keys, unique_rel_types} = this
    const keys = ["unique"].concat([unique || "unique"]).concat(search_keys || []).concat(display_keys || []).concat(unique_rel_types || [])
  
    let res = {}
    let uniqueFound = false

    for (let key of keys) {
      if (!(key in res)) {
        res[key] = {}
      }
      if (key === unique) {
        uniqueFound = true
        res[key].unique = true
      }
      if ((search_keys || []).includes(key)) {
        res[key].search = true
      }
      if ((unique_rel_types || []).includes(key)) {
        res[key].rel = true
      }
    }
    if (uniqueFound){
      delete res["unique"]
    }
    return res
  }
}