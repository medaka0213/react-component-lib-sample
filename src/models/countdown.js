import { Record } from "immutable";
import { sort_array } from '@/libs/utils/sort'

const keys = [
  "pk", "sk", "unique",
  "launch", "event", "created", "updated", "description", "title", "name"
]

function setCollection (){
  let result = {}
  for (let key of keys){
    result[key] = null
  }
  return result
}
export const eventCollection = Object.assign({}, setCollection(), {
  t_plus: [], t_minus: [],
})

export class Countdown extends Record(eventCollection) {
  notFound(){
    return !Boolean(this.type) 
  }
  set_timeline(key = "t_plus" ){
    let res = this.data()
    res[key] = sort_array(this[key], ["hours", "minutes", "seconds"])
    if (key === "t_minus") {
      res[key] = res[key].reverse()
    }
    return new Countdown(res)
  }
  add_timeline(key = "t_plus", value){
    this[key].push(value)
    return this.set_timeline(key)
  }
  remove_timeline(key = "t_plus", index){
    this[key].splice(index, 1)
    return this.set_timeline(key)
  }
  edit_timeline(key = "t_plus", index, value){
    console.log("edit_timeline", key, index, value)
    this[key][index] = value
    return this.set_timeline(key)
  }
  data(){
    let result = {}
    for (let key of keys) {
      if ( this[key] !== undefined && this[key] !== null && this[key] !== "" ) result[key] = this[key]
    }
    result.t_minus = this.t_minus || []
    result.t_plus = this.t_plus || []
    return result
  }
}