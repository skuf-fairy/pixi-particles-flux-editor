import {
  EasingName,
  ScalarDynamicBehaviorConfig,
  ScalarStaticBehaviorConfig,
  ScaleBehaviorConfig,
  ScriptBehaviorConfig,
  VectorBehaviorConfig,
} from "particle-flux";
import { Store } from "../Store";
import { BehaviorType } from "../types";

export class ScaleBehaviorStore extends Store<{
  scalarStaticBehaviorConfig: ScalarStaticBehaviorConfig;
  scalarDynamicBehaviorConfig: ScalarDynamicBehaviorConfig;
  scriptBehaviorConfig: ScriptBehaviorConfig<number>;
  vectorBehaviorConfig: VectorBehaviorConfig;
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
      // todo
      vectorBehaviorConfig: {
        x: {
          value: 1,
          mult: 1,
          easing: EasingName.linear,
        },
        y: {
          value: 1,
          mult: 1,
          easing: EasingName.linear,
        },
      },
      activeType: BehaviorType.ScalarStatic,
      enabled: true,
      availableTypes: [BehaviorType.ScalarStatic, BehaviorType.ScalarDynamic, BehaviorType.Script, BehaviorType.Vector],
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

  public getActiveConfig(): ScaleBehaviorConfig | undefined {
    if (!this.isEnabled()) return;

    switch (this.state.activeType) {
      case BehaviorType.ScalarStatic:
        return this.state.scalarStaticBehaviorConfig;

      case BehaviorType.ScalarDynamic:
        return this.state.scalarDynamicBehaviorConfig;

      case BehaviorType.Script:
        return this.state.scriptBehaviorConfig;

      case BehaviorType.Vector:
        return this.state.vectorBehaviorConfig;
    }
  }
}
