import { ScriptBehaviorConfig } from "particle-flux";
import { ColorBehaviorConfig, ColorDynamicBehaviorConfig, ColorStaticBehaviorConfig } from "particle-flux";
import { Store } from "../Store";
import { BehaviorType } from "../types";

export class ColorBehaviorStore extends Store<{
  staticConfig: ColorStaticBehaviorConfig;
  dynamicConfig: ColorDynamicBehaviorConfig;
  scriptConfig: ScriptBehaviorConfig<string>;
  activeConfig: BehaviorType;
  availableTypes: BehaviorType[];
  enabled: boolean;
}> {
  constructor() {
    super({
      staticConfig: {
        value: "#ffffff",
      },
      dynamicConfig: {
        start: "#ffffff",
        end: "#ffffff",
      },
      scriptConfig: {
        script: [
          { time: 0, value: "#ffffff" },
          { time: 1, value: "#ffffff" },
        ],
      },
      activeConfig: BehaviorType.ScalarStatic,
      enabled: true,
      availableTypes: [BehaviorType.ScalarStatic, BehaviorType.ScalarDynamic, BehaviorType.Script],
    });
  }

  public setDynamicBehaviorConfig(config: ColorDynamicBehaviorConfig): void {
    this.setState({
      ...this.state,
      dynamicConfig: config,
    });
  }

  public setStaticBehaviorConfig(config: ColorStaticBehaviorConfig): void {
    this.setState({
      ...this.state,
      staticConfig: config,
    });
  }

  public setScriptBehaviorConfig(config: ScriptBehaviorConfig<string>): void {
    this.setState({
      ...this.state,
      scriptConfig: config,
    });
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

  public setActiveType(type: BehaviorType): void {
    this.setState({ ...this.state, activeConfig: type });
  }

  public getActiveConfig(): ColorBehaviorConfig | undefined {
    if (!this.isEnabled()) return;

    switch (this.state.activeConfig) {
      case BehaviorType.ScalarStatic:
        return this.state.staticConfig;

      case BehaviorType.ScalarDynamic:
        return this.state.dynamicConfig;

      case BehaviorType.Script:
        return this.state.scriptConfig;

      default:
        return this.state.staticConfig;
    }
  }

  public isStaticConfigActive(): boolean {
    return this.state.activeConfig === BehaviorType.ScalarStatic;
  }

  public isDynamicConfigActive(): boolean {
    return this.state.activeConfig === BehaviorType.ScalarDynamic;
  }

  public isScriptConfigActive(): boolean {
    return this.state.activeConfig === BehaviorType.Script;
  }
}
