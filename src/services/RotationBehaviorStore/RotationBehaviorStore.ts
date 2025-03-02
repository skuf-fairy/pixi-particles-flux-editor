import {
  DeltaBehaviorConfig,
  EasingName,
  RotationBehaviorConfig,
  ScalarDynamicBehaviorConfig,
  ScalarStaticBehaviorConfig,
} from "particle-flux";
import { Store } from "../Store";
import { BehaviorType } from "../types";

export class RotationBehaviorStore extends Store<{
  dynamicConfig: ScalarDynamicBehaviorConfig;
  staticConfig: ScalarStaticBehaviorConfig;
  deltaConfig: DeltaBehaviorConfig;
  activeType: BehaviorType.Dynamic | BehaviorType.Static | BehaviorType.Delta;
  availableTypes: BehaviorType[];
  enabled: boolean;
}> {
  constructor() {
    super({
      dynamicConfig: {
        start: 0,
        end: 1,
        multiplier: 1,
        easing: EasingName.linear,
      },
      staticConfig: {
        value: 0,
      },
      deltaConfig: {
        value: 0,
        delta: 0,
        multiplier: 1,
      },
      activeType: BehaviorType.Static,
      enabled: true,
      availableTypes: [BehaviorType.Static, BehaviorType.Dynamic, BehaviorType.Delta],
    });
  }

  public setStaticConfig(config: ScalarStaticBehaviorConfig): void {
    this.setState({ ...this.state, staticConfig: config });
  }

  public setDynamicConfig(config: ScalarDynamicBehaviorConfig): void {
    this.setState({ ...this.state, dynamicConfig: config });
  }

  public setScalarDeltaConfig(config: DeltaBehaviorConfig): void {
    this.setState({ ...this.state, deltaConfig: config });
  }

  public getActiveConfig(): RotationBehaviorConfig | undefined {
    if (!this.isEnabled()) return;

    switch (this.state.activeType) {
      case BehaviorType.Static:
        return this.state.staticConfig;

      case BehaviorType.Dynamic:
        return this.state.dynamicConfig;

      case BehaviorType.Delta:
        return this.state.deltaConfig;
    }
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

  public setActiveConfigType(type: BehaviorType.Dynamic | BehaviorType.Static | BehaviorType.Delta): void {
    this.setState({
      ...this.state,
      activeType: type,
    });
  }
}
