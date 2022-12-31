import { Record } from "immutable";

const defaultData = {
    pk: "",
    sk: "",
    unique: "",
    slide: "",
    texts: [],
}

export class SlideText extends Record(defaultData) {
    notFound(){
        return !Boolean(this.pk) 
    }
    data() {
        let result = {}
        for (let key of Object.keys(defaultData)) {
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
    get_jp_value(key) {
        return this[key + "_JP"] || this[key + "_jp"]  || this[key]
    }
    textsFormValues() {
        let result = {}
        if (this.texts){
            this.texts.forEach((t, i) => {
                result[`text_page_${i}`] = t
            })
            return result
        }
    }
    formValues2texts(values) {
        let result = []
        let keys = Object.keys(values).filter(k => k.startsWith("text_page_")) 
        for (let i = 0; i <= keys.length-1; i++){
            result.push(values[`text_page_${i}`] || "")
        }
        return result
    }
}