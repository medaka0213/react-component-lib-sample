import { Record } from "immutable";
import { Config } from "./config";

export class ItemReducer extends Record({
  Item: null,
  Items: [],
  config: new Config(),
  isConfigReceived: false,
  isReceived: false,
  isReferenceReceived: false,
  isRelationReceived: false,
  referenceItems: [],
  relationItems: [],
}) {
  getRelList(key){
    return this.relationItems[key] || []
  }
  getRefList(key){
      return this.referenceItems[key] || []
  }
  getRelItem(key){
      let res = this.getRelList(key)
      return res.length? res[0]: null
  }
  getRefItem(key){
      let res = this.getRefList(key)
      return res.length? res[0]: null
  }
  data () {
    return {
      Item: this.Item,
      Items: this.Items,
      config: this.config,
      isConfigReceived: this.isConfigReceived,
      isReceived: this.isReceived,
      isReferenceReceived: this.isReferenceReceived,
      isRelationReceived: this.isRelationReceived,
      referenceItems: this.referenceItems,
      relationItems: this.relationItems,
    }
  }
}
