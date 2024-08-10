import { Fields } from './baseModel';
import { RocketSeries } from './rocketSeries';

export class Rocket extends RocketSeries {
  public readonly rocketSeries: string = '';

  public readonly rocket_height?: number;
  public readonly liftoff_thrust?: number;
  public readonly fairing_diameter?: number;
  public readonly fairing_height?: number;
  public readonly payload_to_leo?: number;
  public readonly payload_to_gto?: number;
  public readonly stages?: number;
  public readonly strap_ons?: number;
  public readonly price?: number;

  constructor(props: Fields<Rocket>) {
    super(props);
    Object.assign(this, props);
  }
}
