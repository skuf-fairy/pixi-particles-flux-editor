import {
  ColorDynamicBehaviorConfig,
  ColorStaticBehaviorConfig,
  EasingName,
  ScriptBehaviorConfig,
  isColorDynamicBehaviorConfig,
  isColorStaticBehaviorConfig,
  isScriptBehaviorConfig,
} from "particle-flux";
import { Store } from "../Store";
import { BehaviorType } from "../types";

export interface BehaviorStoreState {
  dynamicConfig: ColorDynamicBehaviorConfig;
  staticConfig: ColorStaticBehaviorConfig;
  scriptConfig: ScriptBehaviorConfig<string>;
  activeType: BehaviorType;
  availableTypes: BehaviorType[];
  enabled: boolean;
}

export class ColorBehaviorStore extends Store<BehaviorStoreState> {
  constructor() {
    super({
      staticConfig: {
        value: "#ffffff",
      },
      dynamicConfig: {
        start: "#ffffff",
        end: "#9ed1f0",
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

  public setStaticConfig(staticConfig: ColorStaticBehaviorConfig): void {
    this.setState({ ...this.state, staticConfig });
  }

  public setDynamicConfig(dynamicConfig: ColorDynamicBehaviorConfig): void {
    this.setState({ ...this.state, dynamicConfig });
  }

  public setScriptConfig(scriptConfig: ScriptBehaviorConfig<string>): void {
    this.setState({ ...this.state, scriptConfig });
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

  public setAvailableTypes(types: BehaviorType[]): void {
    this.setState({ ...this.state, availableTypes: types });
  }

  public setActiveConfigType(type: BehaviorType): void {
    this.setState({
      ...this.state,
      activeType: type,
    });
  }

  public getActiveConfig():
    | ColorDynamicBehaviorConfig
    | ColorStaticBehaviorConfig
    | ScriptBehaviorConfig<string>
    | undefined {
    if (!this.isEnabled()) return;

    switch (this.state.activeType) {
      case BehaviorType.Static:
        return this.state.staticConfig;

      case BehaviorType.Dynamic:
        return this.state.dynamicConfig;

      case BehaviorType.Script:
        return this.state.scriptConfig;
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

  public restore(config: ColorDynamicBehaviorConfig | ColorStaticBehaviorConfig | ScriptBehaviorConfig<string>): void {
    if (isColorDynamicBehaviorConfig(config)) {
      this.setDynamicConfig(config);
      this.setActiveConfigType(BehaviorType.Dynamic);
      this.enable();
    } else if (isColorStaticBehaviorConfig(config)) {
      this.setStaticConfig(config);
      this.setActiveConfigType(BehaviorType.Static);
      this.enable();
    } else if (isScriptBehaviorConfig(config)) {
      this.setScriptConfig(config);
      this.setActiveConfigType(BehaviorType.Script);
      this.enable();
    }
  }
}
