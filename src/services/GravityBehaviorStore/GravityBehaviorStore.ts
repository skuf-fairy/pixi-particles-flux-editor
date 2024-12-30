import { GravityBehaviorConfig, GravityRangeBehaviorConfig, GravityStaticBehaviorConfig } from "particle-flux";
import { Store } from "../Store";
import { BehaviorType } from "../types";

export class GravityBehaviorStore extends Store<{
  rangeConfig: GravityRangeBehaviorConfig;
  staticConfig: GravityStaticBehaviorConfig;
  activeType: BehaviorType.ScalarDynamic | BehaviorType.ScalarStatic;
  enabled: boolean;
}> {
  constructor() {
    super({
      rangeConfig: {
        min: 0,
        max: 1,
      },
      staticConfig: {
        value: 0,
      },
      activeType: BehaviorType.ScalarStatic,
      enabled: false,
    });
  }

  public setRangeConfig(config: { min: number; max: number }): void {
    this.setState({ ...this.state, rangeConfig: config });
  }

  public setStaticConfig(config: { value: number }): void {
    this.setState({ ...this.state, staticConfig: config });
  }

  public isEnabled(): boolean {
    return this.state.enabled;
  }

  public enable(): void {
    this.setState({ ...this.state, enabled: true });
  }

  public disable(): void {
    this.setState({ ...this.state, enabled: false });
  }

  public getActiveConfig(): GravityBehaviorConfig | undefined {
    if (!this.isEnabled()) return;

    switch (this.state.activeType) {
      case BehaviorType.ScalarStatic:
        return this.state.staticConfig;

      case BehaviorType.ScalarDynamic:
        return this.state.rangeConfig;

      default:
        return this.state.staticConfig;
    }
  }

  public setActiveConfigType(type: BehaviorType.ScalarDynamic | BehaviorType.ScalarStatic): void {
    this.setState({
      ...this.state,
      activeType: type,
    });
  }
}
