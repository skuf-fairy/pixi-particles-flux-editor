import {
  EasingName,
  ScalarDynamicBehaviorConfig,
  ScalarStaticBehaviorConfig,
  ScriptBehaviorConfig,
  SpeedBehaviorConfig,
} from "particle-flux";
import { Store } from "../Store";
import { BehaviorType } from "../types";

export class SpeedBehaviorStore extends Store<{
  scalarStaticBehaviorConfig: ScalarStaticBehaviorConfig;
  scalarDynamicBehaviorConfig: ScalarDynamicBehaviorConfig;
  scriptBehaviorConfig: ScriptBehaviorConfig<number>;
  activeType: BehaviorType;
  enabled: boolean;
}> {
  constructor() {
    super({
      scalarStaticBehaviorConfig: {
        value: 0.1,
        mult: 1,
        easing: EasingName.linear,
      },
      scalarDynamicBehaviorConfig: {
        start: 0,
        end: 1,
        mult: 1,
        easing: EasingName.linear,
      },
      scriptBehaviorConfig: {
        script: [
          { time: 0, value: 0 },
          { time: 1, value: 1 },
        ],
      },
      activeType: BehaviorType.ScalarStatic,
      enabled: true,
    });
  }

  public setScalarDynamicBehaviorConfig(config: ScalarDynamicBehaviorConfig): void {
    this.setState({
      ...this.state,
      scalarDynamicBehaviorConfig: config,
    });
  }

  public setScalarStaticBehaviorConfig(config: ScalarStaticBehaviorConfig): void {
    this.setState({
      ...this.state,
      scalarStaticBehaviorConfig: config,
    });
  }

  public setScriptBehaviorConfig(config: ScriptBehaviorConfig<number>): void {
    this.setState({
      ...this.state,
      scriptBehaviorConfig: config,
    });
  }

  public setActiveType(type: BehaviorType): void {
    this.setState({ ...this.state, activeType: type });
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

  public getActiveConfig(): SpeedBehaviorConfig | undefined {
    if (!this.isEnabled()) return;

    switch (this.state.activeType) {
      case BehaviorType.ScalarStatic:
        return this.state.scalarStaticBehaviorConfig;

      case BehaviorType.ScalarDynamic:
        return this.state.scalarDynamicBehaviorConfig;

      case BehaviorType.Script:
        return this.state.scriptBehaviorConfig;

      default:
        return this.state.scalarStaticBehaviorConfig;
    }
  }
}
