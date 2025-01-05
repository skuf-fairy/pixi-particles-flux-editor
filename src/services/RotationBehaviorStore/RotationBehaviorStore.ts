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
  activeType: BehaviorType.ScalarDynamic | BehaviorType.ScalarStatic | BehaviorType.Delta;
  availableTypes: BehaviorType[];
  enabled: boolean;
}> {
  constructor() {
    super({
      dynamicConfig: {
        start: 0,
        end: 1,
        mult: 1,
        easing: EasingName.linear,
      },
      staticConfig: {
        value: 0,
      },
      deltaConfig: {
        value: 0,
        delta: 0,
      },
      activeType: BehaviorType.ScalarStatic,
      enabled: true,
      availableTypes: [BehaviorType.ScalarStatic, BehaviorType.ScalarDynamic, BehaviorType.Delta],
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
      case BehaviorType.ScalarStatic:
        return this.state.staticConfig;

      case BehaviorType.ScalarDynamic:
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

  public setActiveConfigType(type: BehaviorType.ScalarDynamic | BehaviorType.ScalarStatic | BehaviorType.Delta): void {
    this.setState({
      ...this.state,
      activeType: type,
    });
  }
}
