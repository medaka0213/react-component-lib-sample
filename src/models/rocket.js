import { Record } from "immutable";

const keys = [
  "pk", "sk", "unique",
  //search keys
  "name", "name_JP", "manufacturer", "manufacturer_JP", 
  "rocketSeries", "NextSpaceFlight",
  "status",  "rocket_height", "liftoff_thrust", 
  "fairing_diameter", "fairing_height", "payload_to_leo", "payload_to_gto", "stages", "strap_ons", "price",

  "wiki_url", "rocket_image_url",
  "image_url", "image_credit", "description", "description_JP", "overview", "overview_JP",
]

function setCollection (){
  let result = {}
  for (let key of keys){
    result[key] = null
  }
  return result
}

export class Rocket extends Record(setCollection()) {
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
    return "rocket"
  }
  itemPath(){
    return `/q/${this.itemTypeName()}/i/${this.pk}`
  }
  adminUrl(){
    return "https://admin.virtualrocketwatching.net" + this.itemPath()
  }
  pubUrl(){
    return `https://virtualrocketwatching.net/rocket/detail/?pk=${this.pk}`
  }
  get_jp_value(key) {
    return this[key + "_JP"] || this[key + "_jp"]  || this[key]
  }
  nextSpaceFlightLink() {
    return `https://nextspaceflight.com/rockets/${this.NextSpaceFlight}`
  }
}
