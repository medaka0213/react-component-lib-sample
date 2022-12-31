import { Fields } from './baseModel';
import { Config } from './config';

export class ItemReducer {
  public readonly Item?: any;
  public readonly Items?: any[];
  public readonly config?: Config;
  public readonly isConfigReceived?: boolean;
  public readonly isReceived?: boolean;
  public readonly isReferenceReceived?: boolean;
  public readonly isRelationReceived?: boolean;
  public readonly referenceItems?: any;
  public readonly relationItems?: any;

  constructor(props: Fields<ItemReducer>) {
    Object.assign(this, props);
  }

  getRelList(key: string) {
    return this.relationItems[key] || [];
  }
  getRefList(key: string) {
    return this.referenceItems[key] || [];
  }
  getRelItem(key: string) {
    let res = this.getRelList(key);
    return res.length ? res[0] : null;
  }
  getRefItem(key: string) {
    let res = this.getRefList(key);
    return res.length ? res[0] : null;
  }
}
