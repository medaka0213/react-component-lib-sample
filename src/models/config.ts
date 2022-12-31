import { BaseModel, Fields } from './baseModel';

export class Config extends BaseModel {
  public readonly unique!: string;
  public readonly search_keys!: string[];
  public readonly display_keys!: string[];
  public readonly rel_types!: string[];
  public readonly unique_rel_types!: string[];

  constructor(props: Fields<Config>) {
    super(props);
    Object.assign(this, props);
  }

  uniqueKey() {
    return this.unique || 'unique';
  }
  displayKeys() {
    if (this.display_keys.length) {
      return this.display_keys;
    }
    return this.search_keys || ['pk', 'sk', 'unique'];
  }
  createKeys() {
    const { unique, search_keys, display_keys, unique_rel_types } = this;
    const keys = ['unique']
      .concat([unique || 'unique'])
      .concat(search_keys || [])
      .concat(display_keys || [])
      .concat(unique_rel_types || []);

    let res: any = {};
    let uniqueFound = false;

    for (let key of keys) {
      if (!(key in res)) {
        res[key] = {};
      }
      if (key === unique) {
        uniqueFound = true;
        res[key].unique = true;
      }
      if ((search_keys || []).includes(key)) {
        res[key].search = true;
      }
      if ((unique_rel_types || []).includes(key)) {
        res[key].rel = true;
      }
    }
    if (uniqueFound) {
      delete res['unique'];
    }
    return res;
  }
}
