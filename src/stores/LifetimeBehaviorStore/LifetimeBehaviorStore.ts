import {
  LifeTimeBehaviorConfig,
  LifeTimeRangeBehaviorConfig,
  LifeTimeStaticBehaviorConfig,
  isLifeTimeRangeBehaviorConfig,
  isLifeTimeStaticBehaviorConfig,
} from "particle-flux";
import { Store } from "../Store";
import { BehaviorType } from "../types";

export class LifetimeBehaviorStore extends Store<{
  rangeConfig: LifeTimeRangeBehaviorConfig;
  staticConfig: LifeTimeStaticBehaviorConfig;
  activeType: BehaviorType;
  availableTypes: BehaviorType[];
}> {
  constructor() {
    super({
      rangeConfig: {
        min: 1500,
        max: 4000,
      },
      staticConfig: {
        value: 1000,
      },
      activeType: BehaviorType.Static,
      availableTypes: [BehaviorType.Static, BehaviorType.Dynamic],
    });
  }

  public setRangeConfig(config: LifeTimeRangeBehaviorConfig) {
    this.setState({
      ...this.state,
      rangeConfig: config,
    });
  }

  public setStaticConfig(config: LifeTimeStaticBehaviorConfig) {
    this.setState({
      ...this.state,
      staticConfig: config,
    });
  }

  public getActiveConfig(): LifeTimeBehaviorConfig {
    if (this.state.activeType === BehaviorType.Static) {
      return this.state.rangeConfig;
    }

    return this.state.staticConfig;
  }

  public setActiveType(type: BehaviorType.Static | BehaviorType.Dynamic): void {
    this.setValue("activeType", type);
  }

  public restore(config: LifeTimeBehaviorConfig): void {
    if (isLifeTimeStaticBehaviorConfig(config)) {
      this.setStaticConfig(config);
      this.setActiveType(BehaviorType.Static);
    } else if (isLifeTimeRangeBehaviorConfig(config)) {
      this.setRangeConfig(config);
      this.setActiveType(BehaviorType.Dynamic);
    }
  }
}
