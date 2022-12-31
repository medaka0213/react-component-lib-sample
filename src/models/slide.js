import { Record } from "immutable";
import { v4 as uuidv4 } from 'uuid';

const keys = [
    "pk", "sk", "unique",
    "type", "name", "created-at", "updated-at", "data-length", "user",
    "paths", "texts", "extension"
]


function setCollection() {
    let result = {}
    for (let key of keys) {
        result[key] = ""
    }
    return result
}
export const collection = setCollection()

export class Slide extends Record(collection) {
    init(){
        if (!this.unique){
            this.unique = `${this.type || "slide"}_${uuidv4()}`
        }
        if (!this["created-at"]){
            this["created-at"] = new Date().toISOString()
        }
    }
    imagePaths(){
        if (this.paths){
            return this.paths
        } else if (this["data-length"]){
            let res = []
            for (let i = 0; i < this["data-length"]; i++){
                res.push(`slide/${this.pk}/${('00000'+i).slice(-5)}.jpeg`)
            }
            return res
        } else {
            return []
        }
    }

    imageLinks() {
        if (this["data-length"]){
            return this.imagePaths().map(path => `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${path}`)
        } else {
            return []
        }
    }
    imageLinksCached() {
        return this.imageLinks()
    }
    
    marpRef(start=0, end=this["data-length"]-1, includeCredit=false) {
        if (includeCredit){
            return this.marpRefWithCredit(start, end)
        }
        let res = ""
        for (let i = start; i <= end; i++){
            res += "---\n\n"
            res += `![bg fit](${this.imageLinksCached()[i]})\n\n`
        }
        return res
    }

    marpRefWithCredit(start=0, end=this["data-length"]-1) {
        let res = ""
        for (let i = start; i <= end; i++){
            res += "---\n\n"
            res += `![bg h:85%](${this.imageLinksCached()[i]})\n\n`
            res += `<!--\n_footer: "Credit: ${this.user}"\n-->\n\n`
        }
        return res
    }

    videoLink() {
        return `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/video/${this.pk}.mp4`
    }
    videoLinkCached() {
        return `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/video/${this.pk}.mp4`
    }
    data() {
        let result = {}
        for (let key of keys) {
            let _value = this[key] || ""
            if (_value != "") result[key] = _value
        }
        return result
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
}