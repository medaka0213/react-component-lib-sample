import { Record } from "immutable";
import { MissionTitle_EN, MissionTitle_JP } from "@/libs/utils/announcements/MissionTitle";

const keys = [
  "pk", "sk", "NextSpaceFlight","unique",
  //search keys
  "name", "datetime", "site", "pad", "rocket", "result", "NextSpaceFlight", "COSPAR",
  "name_JP", "site_JP", "pad_JP", "rocket_JP",
  "overview", "overview_JP",
  //datetime keys
  "datetime_format", "datetime_format_JP", "datetime","datetime_time_type","datetime_date_type", "datetime_isNET", "datetime_time_type",
  "image_url", "image_credit",
  
  //unique rel keys
  'rocket', 'site', 'pad', "provider",
  "watch_URL", "watch_URL_short", "watch_URL_liftoff_at", "watch_URL_option",
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

export class Event extends Record(eventCollection) {
  missionID() { return (`${this.type}_${this.eventID}`); }
  isLaunch() { return (this.pk.startsWith("launch")); }

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
    return "event"
  }
  itemPath(){
    return `/q/${this.itemTypeName()}/i/${this.pk}`
  }
  adminUrl(){
    return "https://admin.virtualrocketwatching.net" + this.itemPath()
  }
  pubUrl(){
    return `https://virtualrocketwatching.net/mission/detail/?pk=${this.pk}`
  }
  get_jp_value(key) {
    return this[key + "_JP"] || this[key + "_jp"]  || this[key]
  }
  nextSpaceFlightLink() {
    return ("https://nextspaceflight.com/events/");
  }
  meetUpInfo() {
    return {
      title: MissionTitle_EN(this.data(), true),
      title_JP: MissionTitle_JP(this.data(), true),
      missionID: `event_${this.unique}`,
    }
  }
}