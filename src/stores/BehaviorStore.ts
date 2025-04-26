import {
  DeltaBehaviorConfig,
  EasingName,
  NumberScriptBehaviorConfig,
  Point2d,
  ScalarDynamicBehaviorConfig,
  ScalarStaticBehaviorConfig,
  ScriptBehaviorConfig,
  VectorBehaviorConfig,
  isDeltaBehaviorConfig,
  isScalarDynamicBehaviorConfig,
  isScalarStaticBehaviorConfig,
  isVectorBehaviorConfig,
} from "particle-flux";
import { isNumberScriptBehaviorConfig } from "particle-flux/lib/core/base-behaviors/script-behavior/number-script-behavior/number-script-behavior.typeguards";
import { Store } from "./Store";
import { BehaviorType } from "./types";

export interface BehaviorStoreState {
  dynamicConfig: ScalarDynamicBehaviorConfig;
  staticConfig: ScalarStaticBehaviorConfig;
  vectorConfig: VectorBehaviorConfig;
  scriptConfig: NumberScriptBehaviorConfig;
  deltaConfig: DeltaBehaviorConfig;
  activeType: BehaviorType;
  availableTypes: BehaviorType[];
  enabled: boolean;
}

export class BehaviorStore extends Store<BehaviorStoreState> {
  constructor(initialState: Partial<BehaviorStoreState>) {
    super({
      staticConfig: {
        value: 1,
        multiplier: 1,
      },
      dynamicConfig: {
        start: 0,
        end: 1,
        easing: EasingName.linear,
        multiplier: 1,
      },
      vectorConfig: {
        x: {
          value: 0,
          multiplier: 1,
        },
        y: {
          value: 0,
          multiplier: 1,
        },
      },
      scriptConfig: {
        script: [
          { value: 0, time: 1 },
          { value: 0.5, time: 0.5 },
          { value: 0, time: 1 },
        ],
        isInterpolate: false,
      },
      deltaConfig: {
        value: 0,
        delta: 0,
        multiplier: 1,
      },
      activeType: BehaviorType.Static,
      availableTypes: [],
      enabled: false,
      ...initialState,
    });
  }

  public setStaticConfig(staticConfig: ScalarStaticBehaviorConfig): void {
    this.setState({ ...this.state, staticConfig });
  }

  public setDynamicConfig(dynamicConfig: ScalarDynamicBehaviorConfig): void {
    this.setState({ ...this.state, dynamicConfig });
  }

  public setVectorConfig(vectorConfig: VectorBehaviorConfig): void {
    this.setState({ ...this.state, vectorConfig });
  }

  public setScriptConfig(scriptConfig: NumberScriptBehaviorConfig): void {
    this.setState({ ...this.state, scriptConfig });
  }

  public setDeltaConfig(deltaConfig: DeltaBehaviorConfig): void {
    this.setState({ ...this.state, deltaConfig });
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
    | ScalarDynamicBehaviorConfig
    | ScalarStaticBehaviorConfig
    | NumberScriptBehaviorConfig
    | VectorBehaviorConfig
    | DeltaBehaviorConfig
    | undefined {
    if (!this.isEnabled()) return;

    switch (this.state.activeType) {
      case BehaviorType.Static:
        return this.state.staticConfig;

      case BehaviorType.Dynamic:
        return this.state.dynamicConfig;

      case BehaviorType.Delta:
        return this.state.deltaConfig;

      case BehaviorType.Vector:
        return this.state.vectorConfig;

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

  public isDeltaConfigActive(): boolean {
    return this.state.activeType === BehaviorType.Delta;
  }

  public isVectorConfigActive(): boolean {
    return this.state.activeType === BehaviorType.Vector;
  }

  public restore(
    config:
      | ScalarDynamicBehaviorConfig
      | ScalarStaticBehaviorConfig
      | ScriptBehaviorConfig<number | Point2d>
      | VectorBehaviorConfig
      | DeltaBehaviorConfig
  ): void {
    if (isScalarDynamicBehaviorConfig(config)) {
      this.setDynamicConfig(config);
      this.setActiveConfigType(BehaviorType.Dynamic);
      this.enable();
    } else if (isScalarStaticBehaviorConfig(config)) {
      this.setStaticConfig(config);
      this.setActiveConfigType(BehaviorType.Static);
      this.enable();
    } else if (isNumberScriptBehaviorConfig(config)) {
      this.setScriptConfig(config);
      this.setActiveConfigType(BehaviorType.Script);
      this.enable();
    } else if (isVectorBehaviorConfig(config)) {
      this.setVectorConfig(config);
      this.setActiveConfigType(BehaviorType.Vector);
      this.enable();
    } else if (isDeltaBehaviorConfig(config)) {
      this.setDeltaConfig(config);
      this.setActiveConfigType(BehaviorType.Delta);
      this.enable();
    }
  }
}
