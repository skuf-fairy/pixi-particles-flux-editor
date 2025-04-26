import {
  EasingName,
  GravityBehaviorConfig,
  ScalarDynamicBehaviorConfig,
  ScalarStaticBehaviorConfig,
  isScalarDynamicBehaviorConfig,
  isScalarStaticBehaviorConfig,
} from "particle-flux";
import { Store } from "../Store";
import { BehaviorType } from "../types";

export class GravityBehaviorStore extends Store<{
  scalarStaticBehaviorConfig: ScalarStaticBehaviorConfig;
  scalarDynamicBehaviorConfig: ScalarDynamicBehaviorConfig;
  activeType: BehaviorType.Dynamic | BehaviorType.Static;
  availableTypes: BehaviorType[];
  enabled: boolean;
}> {
  constructor() {
    super({
      scalarDynamicBehaviorConfig: {
        start: 0,
        end: 1,
        multiplier: 1,
        easing: EasingName.linear,
      },
      scalarStaticBehaviorConfig: {
        value: 0.3,
      },
      activeType: BehaviorType.Static,
      availableTypes: [BehaviorType.Static, BehaviorType.Dynamic],
      enabled: false,
    });
  }

  public setDynamicConfig(config: ScalarDynamicBehaviorConfig): void {
    this.setState({ ...this.state, scalarDynamicBehaviorConfig: config });
  }

  public setStaticConfig(config: ScalarStaticBehaviorConfig): void {
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
      case BehaviorType.Static:
        return this.state.scalarStaticBehaviorConfig;

      case BehaviorType.Dynamic:
        return this.state.scalarDynamicBehaviorConfig;
    }
  }

  public setActiveConfigType(type: BehaviorType.Dynamic | BehaviorType.Static): void {
    this.setState({
      ...this.state,
      activeType: type,
    });
  }

  public restore(config: GravityBehaviorConfig): void {
    this.reset();

    if (isScalarDynamicBehaviorConfig(config)) {
      this.setDynamicConfig(config);
      this.setActiveConfigType(BehaviorType.Dynamic);
      this.enable();
    } else if (isScalarStaticBehaviorConfig(config)) {
      this.setStaticConfig(config);
      this.setActiveConfigType(BehaviorType.Static);
      this.enable();
    }
  }
}
