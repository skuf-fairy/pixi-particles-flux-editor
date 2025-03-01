import { ScriptBehaviorConfig } from "particle-flux";
import { ColorBehaviorConfig, ColorDynamicBehaviorConfig, ColorStaticBehaviorConfig } from "particle-flux";
import { Store } from "../Store";
import { BehaviorType } from "../types";

export class ColorBehaviorStore extends Store<{
  staticConfig: ColorStaticBehaviorConfig;
  dynamicConfig: ColorDynamicBehaviorConfig;
  scriptConfig: ScriptBehaviorConfig<string>;
  activeType: BehaviorType;
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
      activeType: BehaviorType.Static,
      enabled: true,
      availableTypes: [BehaviorType.Static, BehaviorType.Dynamic, BehaviorType.Script],
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
    this.setState({ ...this.state, activeType: type });
  }

  public getActiveConfig(): ColorBehaviorConfig | undefined {
    if (!this.isEnabled()) return;

    switch (this.state.activeType) {
      case BehaviorType.Static:
        return this.state.staticConfig;

      case BehaviorType.Dynamic:
        return this.state.dynamicConfig;

      case BehaviorType.Script:
        return this.state.scriptConfig;

      default:
        return this.state.staticConfig;
    }
  }

  public isStaticConfigActive(): boolean {
    return this.state.activeType === BehaviorType.Static;
  }

  public isDynamicConfigActive(): boolean {
    return this.state.activeType === BehaviorType.Dynamic;
  }

  public isScriptConfigActive(): boolean {
    return this.state.activeType === BehaviorType.Script;
  }
}
