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
        min: 500,
        max: 1500,
      },
      staticConfig: {
        value: 500,
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
      return this.state.staticConfig;
    }

    return this.state.rangeConfig;
  }

  public setActiveType(type: BehaviorType): void {
    this.setValue("activeType", type);
  }

  public getActiveType(): BehaviorType {
    return this.state.activeType;
  }

  public restore(config: LifeTimeBehaviorConfig | undefined): void {
    if (config === undefined) return;

    if (isLifeTimeStaticBehaviorConfig(config)) {
      this.setStaticConfig(config);
      this.setActiveType(BehaviorType.Static);
    } else if (isLifeTimeRangeBehaviorConfig(config)) {
      this.setRangeConfig(config);
      this.setActiveType(BehaviorType.Dynamic);
    }
  }
}
