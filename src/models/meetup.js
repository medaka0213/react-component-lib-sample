import {
    Record
} from "immutable";

const keys = [
    "pk", "sk", "unique",
    "type", "user", "datetime",
    "title", "title_JP",
    "name", "name_JP",
    "image_url", "image_credit",
    "launch", "event", "missionID",
    "created-at", "updated-at",
    "calendar",
    "tweet", "tweet_JP",
    "isThumbDone", "isPosterDone", "isTwitterDone", "isVRCEveDone", "isSlideDone", "isCountDownDone",

]

function setCollection() {
    let result = {}
    for (let key of keys) {
        result[key] = ""
    }
    return result
}
export const collection = setCollection()

export class MeetUp extends Record(collection) {
    eventType() {
        return this.missionID.split("_")[0]
    }
    eventID() {
        return this.missionID.split("_")[1]
    }
    posterLink_JP() {
        return `${process.env.NEXT_PUBLIC_S3_URL}/images/poster/${this.missionID}_${this.type}_JP.jpg`
    }
    posterLink_EN() {
        return `${process.env.NEXT_PUBLIC_S3_URL}/images/poster/${this.missionID}_${this.type}_EN.jpg`
    }
    pageLink() {
        return `/meetups/i/${this.type}/${this.missionID}`
    }

    notFound() {
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
    itemTypeName() {
        return "meetup"
    }
    itemPath() {
        return `/q/${this.itemTypeName()}/i/${this.pk}`
    }
    adminUrl() {
        return "https://admin.virtualrocketwatching.net" + this.itemPath()
    }
    get_jp_value(key) {
        return this[key + "_JP"] || this[key + "_jp"] || this[key]
    }
    get_paretnt_type(){
        return this.missionID.split("_")[0]
    }

    slideInfo() {
        return {
            slideType: this.missionID.split("_")[0],
            slideID: this.missionID.split("_")[1],
        }
    }
}