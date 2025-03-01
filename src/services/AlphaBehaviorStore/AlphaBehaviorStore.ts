import {
  AlphaBehaviorConfig,
  EasingName,
  ScalarDynamicBehaviorConfig,
  ScalarStaticBehaviorConfig,
  ScriptBehaviorConfig,
} from "particle-flux";
import { Store } from "../Store";
import { BehaviorType } from "../types";

export class AlphaBehaviorStore extends Store<{
  scalarStaticBehaviorConfig: ScalarStaticBehaviorConfig;
  scalarDynamicBehaviorConfig: ScalarDynamicBehaviorConfig;
  scriptBehaviorConfig: ScriptBehaviorConfig<number>;
  activeType: BehaviorType;
  availableTypes: BehaviorType[];
  enabled: boolean;
}> {
  constructor() {
    super({
      scalarStaticBehaviorConfig: {
        value: 1,
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
      activeType: BehaviorType.Static,
      enabled: true,
      availableTypes: [BehaviorType.Static, BehaviorType.Dynamic, BehaviorType.Script],
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

  public enable(): void {
    this.setState({ ...this.state, enabled: true });
  }

  public disable(): void {
    this.setState({ ...this.state, enabled: false });
  }

  public isEnabled(): boolean {
    return this.state.enabled;
  }

  public setActiveType(type: BehaviorType): void {
    this.setState({ ...this.state, activeType: type });
  }

  public getActiveConfig(): AlphaBehaviorConfig | undefined {
    if (!this.isEnabled()) return;

    switch (this.state.activeType) {
      case BehaviorType.Static:
        return this.state.scalarStaticBehaviorConfig;

      case BehaviorType.Dynamic:
        return this.state.scalarDynamicBehaviorConfig;

      case BehaviorType.Script:
        return this.state.scriptBehaviorConfig;
    }
  }
}
