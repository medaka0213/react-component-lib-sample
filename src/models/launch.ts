import { Event } from './event';
import { Fields } from './baseModel';

export class Launch extends Event {
  public readonly COSPER: string = '';
  public readonly pad: string = '';
  public readonly pad_JP: string = '';
  public readonly rocket: string = '';
  public readonly rocket_JP: string = '';
  public readonly site: string = '';
  public readonly site_JP: string = '';
  public readonly provider: string = '';
  public readonly provider_JP: string = '';
  public readonly result: string = '';

  constructor(props: Fields<Launch>) {
    super(props);
    Object.assign(this, props);
  }
}
