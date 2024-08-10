import { BaseModel, Fields } from './baseModel';

export class RocketSeries extends BaseModel {
  public readonly NextSpaceFlight: string = '';
  public readonly name: string = '';
  public readonly name_JP: string = '';
  public readonly manufacturer: string = '';
  public readonly manufacturer_JP: string = '';
  public readonly status: string = '';
  public readonly wiki_url: string = '';
  public readonly rocket_image_url: string = '';
  public readonly image_url: string = '';
  public readonly image_credit: string = '';
  public readonly description: string = '';
  public readonly description_JP: string = '';
  public readonly overview: string = '';
  public readonly overview_JP: string = '';

  constructor(props: Fields<RocketSeries>) {
    super(props);
    Object.assign(this, props);
  }
}
