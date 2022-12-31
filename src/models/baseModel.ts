type AnyFunction = (...args: any[]) => any;

type KeysOfType<T, S> = {
  [key in keyof T]: S extends T[key] ? key : never;
}[keyof T];

type UndefinedToOptional<T> = Omit<T, KeysOfType<T, undefined>> &
  Partial<Pick<T, KeysOfType<T, undefined>>>;

export type Fields<T> = UndefinedToOptional<
  Omit<T, KeysOfType<T, AnyFunction>>
>;

export class BaseModel {
  public readonly pk: string = '';
  public readonly sk: string = '';
  public readonly unique: string = '';

  constructor(props: Fields<BaseModel>) {
    Object.assign(this, props);
  }

  itemType(mode: 'admin' | 'pub' = 'admin'): string {
    let type = this.sk.replace('_item', '');
    if (mode == 'pub' && (type == 'launch' || type == 'event')) {
      type = 'mission';
    }
    return type;
  }
  itemDetailPath(mode: 'admin' | 'pub' = 'admin'): string {
    const type = this.itemType(mode);
    if (mode === 'admin') {
      return `/q/${type}/i/${this.pk}`;
    } else {
      return `/${type}/detail/?pk=${this.pk}`;
    }
  }
  itemListPath(): string {
    return `/${this.itemType()}/`;
  }

  notFound(): boolean {
    return this.pk === '' || this.sk === '';
  }
  get_jp_value(key: string): any {
    const target: any = this;
    let value: any = target[key + '_JP'];
    if (value !== undefined && value !== null && value !== '') {
      return value;
    }
    value = target[key + '_jp'];
    if (value !== undefined && value !== null && value !== '') {
      return value;
    }
    value = target[key];
    if (value !== undefined && value !== null && value !== '') {
      return value;
    }
    return null;
  }
  data(): any {
    let _data: any = this;
    let result: any = {};
    for (let key of Object.keys(_data)) {
      if (_data[key] !== undefined && _data[key] !== null && _data[key] !== '')
        result[key] = _data[key];
    }
    return result;
  }

  imageUrl(): string {
    return 'https://img.virtualrocketwatching.net/VRWlogo_21-02-14_JP.png';
  }
  adminUrl(): string {
    const path = this.itemDetailPath('admin');
    return `https://admin.virtualrocketwatching.net${path}`;
  }
  pubUrl(): string {
    const path = this.itemDetailPath('pub');
    return `https://virtualrocketwatching.net${path}`;
  }
}
