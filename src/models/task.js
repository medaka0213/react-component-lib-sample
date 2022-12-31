import { Record } from "immutable";

const keys = [
  "pk", "sk", "unique",
  //search keys
  "launch", "event", "meetup", "user", "wiki", 
  "status", "type", "name", "name_JP", "description",
  "warn","created","assigned","completed","confirmed",
]

const taskState = {
  a000_TODO: {
    name: "通常タスク",
    desc: "この作業の担当者は、まだ割り当てられていません。",
    color: "warning",
  },
  a001_WARN: {
    name: "緊急タスク",
    desc: "ただちに担当者を割り当てて、作業を完了してください。",
    color: "danger",
  },
  a010_ASSIGNED: {
    name: "作業中",
    desc: "担当者は割り当て済みです。",
    color: "secondary",
    isWIP: true,
  },
  a011_COMPLETED: {
    name: "作業完了",
    desc: "管理者の方は、作業完了を確認してください。",
    color: "info",
    isWIP: true,
    isDone: true,
  },
  a012_REVISION: {
    name: "修正依頼",
    desc: "担当者の方は、作業メモを参考に修正を行ってください。",
    color: "primary",
    isWIP: true,
    isDone: true,
  },
  a100_CONFIRMED: {
    name: "作業完了を確認",
    desc: "お疲れ様でした。",
    color: "success",
    isDone: true,
  },
  a101_IGNORED: {
    name: "やらなくていい",
    desc: "他の作業を優先してください。",
    color: "light",
    isDone: true,
  },
};

function setCollection (){
  let result = {}
  for (let key of keys){
    result[key] = null
  }
  return result
}

export class Task extends Record(setCollection()) {
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
    return "task"
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
  get_target_type(){
    for (let key of ["launch", "event", "meetup"]){
      let _value = this[key] || ""
      if (_value != "") return key
    }
  }
  isStatusDone(){
    return taskState[this.status].isDone
  }
  isStatusWIP(){
    return taskState[this.status].isWIP
  }
  statusDesc(){
    return taskState[this.status].desc
  }
  statusColor(){
    return taskState[this.status].color
  }
  statusName(isShort=false){
    return taskState[this.status].name + (isShort ? "" : ` (${this.status})`)
  }
}