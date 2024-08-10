import { BaseModel, Fields } from './baseModel';
import { sort_array } from '../utils/sort';

import { cowntdown_time } from '../utils/time';

export class Countdown extends BaseModel {
  public readonly launch: string = '';
  public readonly event: string = '';

  public readonly created: string = '';
  public readonly updated: string = '';
  public readonly description: string = '';
  public readonly name: string = '';

  public readonly t_plus: any[] = [];
  public readonly t_minus: any[] = [];

  constructor(props: Fields<Countdown>) {
    super(props);
    Object.assign(this, props);
  }
}
