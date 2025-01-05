import {
  EasingName,
  GravityBehaviorConfig,
  ScalarDynamicBehaviorConfig,
  ScalarStaticBehaviorConfig,
} from "particle-flux";
import { Store } from "../Store";
import { BehaviorType } from "../types";

export class GravityBehaviorStore extends Store<{
  scalarStaticBehaviorConfig: ScalarStaticBehaviorConfig;
  scalarDynamicBehaviorConfig: ScalarDynamicBehaviorConfig;
  activeType: BehaviorType.ScalarDynamic | BehaviorType.ScalarStatic;
  availableTypes: BehaviorType[];
  enabled: boolean;
}> {
  constructor() {
    super({
      scalarDynamicBehaviorConfig: {
        start: 0,
        end: 1,
        mult: 1,
        easing: EasingName.linear,
      },
      scalarStaticBehaviorConfig: {
        value: 1,
        mult: 1,
        easing: EasingName.linear,
      },
      activeType: BehaviorType.ScalarStatic,
      availableTypes: [BehaviorType.ScalarStatic, BehaviorType.ScalarDynamic],
      enabled: false,
    });
  }

  public setDynamicConfig(config: ScalarDynamicBehaviorConfig): void {
    this.setState({ ...this.state, scalarDynamicBehaviorConfig: config });
  }

  public setStaticConfig(config: { value: number }): void {
    this.setState({ ...this.state, scalarStaticBehaviorConfig: config });
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
        return this.state.scalarDynamicBehaviorConfig;

      case BehaviorType.ScalarDynamic:
        return this.state.scalarStaticBehaviorConfig;
    }
  }

  public setActiveConfigType(type: BehaviorType.ScalarDynamic | BehaviorType.ScalarStatic): void {
    this.setState({
      ...this.state,
      activeType: type,
    });
  }
}
