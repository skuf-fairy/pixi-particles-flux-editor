import { LifeTimeRangeBehaviorConfig } from "particle-flux";
import { Store } from "../Store";

export class LifetimeBehaviorStore extends Store<LifeTimeRangeBehaviorConfig> {
  constructor() {
    super({
      min: 500,
      max: 1000,
    });
  }

  public setRangeConfig(config: LifeTimeRangeBehaviorConfig) {
    this.setState(config);
  }
}
