import {
  DeltaRotationConfig,
  EasingName,
  ScalarBehaviorConfig,
  ScalarDynamicBehaviorConfig,
  ScalarStaticBehaviorConfig,
} from "particle-flux";
import { Store } from "../Store";
import { BehaviorType } from "../types";

export class RotationBehaviorStore extends Store<{
  dynamicConfig: ScalarDynamicBehaviorConfig;
  staticConfig: ScalarStaticBehaviorConfig;
  deltaRotationConfig: DeltaRotationConfig;
  activeType: BehaviorType.ScalarDynamic | BehaviorType.ScalarStatic;
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
      deltaRotationConfig: {
        angle: 0,
        deltaAngle: 0,
      },
      activeType: BehaviorType.ScalarStatic,
      enabled: true,
    });
  }

  public setStaticConfig(config: ScalarStaticBehaviorConfig): void {
    this.setState({ ...this.state, staticConfig: config });
  }

  public setDynamicConfig(config: ScalarDynamicBehaviorConfig): void {
    this.setState({ ...this.state, dynamicConfig: config });
  }

  public getActiveConfig(): ScalarBehaviorConfig | undefined {
    if (!this.isEnabled()) return;

    switch (this.state.activeType) {
      case BehaviorType.ScalarStatic:
        return this.state.staticConfig;

      case BehaviorType.ScalarDynamic:
        return this.state.dynamicConfig;

      default:
        return this.state.staticConfig;
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

  public setActiveConfigType(type: BehaviorType.ScalarDynamic | BehaviorType.ScalarStatic): void {
    this.setState({
      ...this.state,
      activeType: type,
    });
  }
}
