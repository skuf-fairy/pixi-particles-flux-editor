import {BaseBehaviorStoreState} from './BaseBehaviorStore.types';

import {
  DeltaBehaviorConfig,
  EasingName,
  NumberScriptBehaviorConfig,
  Point2d,
  ScalarStaticBehaviorConfig,
  ScalarTransitionBehaviorConfig,
  ScriptBehaviorConfig,
  VectorBehaviorConfig,
  isDeltaBehaviorConfig,
  isNumberScriptBehaviorConfig,
  isScalarStaticBehaviorConfig,
  isScalarTransitionBehaviorConfig,
  isVectorBehaviorConfig,
} from 'particle-flux';

import {Store} from '../Store';
import {BehaviorType} from '../types';

export class BaseBehaviorStore extends Store<BaseBehaviorStoreState> {
  constructor(initialState: Partial<BaseBehaviorStoreState>) {
    super({
      staticConfig: {
        value: 1,
        multiplier: 1,
      },
      transitionConfig: {
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
          {value: 0, time: 100},
          {value: 0.5, time: 0.5},
          {value: 0, time: 100},
        ],
        isInterpolate: false,
      },
      deltaConfig: {
        value: 0,
        delta: 0,
        multiplier: 1,
      },
      activeType: BehaviorType.Static,
      availableBehaviorTypes: [],
      enabled: false,
      ...initialState,
    });
  }

  public setStaticConfig(staticConfig: ScalarStaticBehaviorConfig): void {
    this.setState({...this.state, staticConfig});
  }

  public setTransitionConfig(transitionConfig: ScalarTransitionBehaviorConfig): void {
    this.setState({...this.state, transitionConfig});
  }

  public setVectorConfig(vectorConfig: VectorBehaviorConfig): void {
    this.setState({...this.state, vectorConfig});
  }

  public setScriptConfig(scriptConfig: NumberScriptBehaviorConfig): void {
    this.setState({...this.state, scriptConfig});
  }

  public setDeltaConfig(deltaConfig: DeltaBehaviorConfig): void {
    this.setState({...this.state, deltaConfig});
  }

  public isEnabled(): boolean {
    return this.state.enabled;
  }

  public enable(): void {
    this.setState({...this.state, enabled: true});
  }

  public disable(): void {
    this.setState({...this.state, enabled: false});
  }

  public setAvailableTypes(types: BehaviorType[]): void {
    this.setState({...this.state, availableBehaviorTypes: types});
  }

  public setActiveConfigType(type: BehaviorType): void {
    this.setState({
      ...this.state,
      activeType: type,
    });
  }

  public getActiveConfig():
    | ScalarTransitionBehaviorConfig
    | ScalarStaticBehaviorConfig
    | NumberScriptBehaviorConfig
    | VectorBehaviorConfig
    | DeltaBehaviorConfig
    | undefined {
    if (!this.isEnabled()) return;

    switch (this.state.activeType) {
      case BehaviorType.Static:
        return this.state.staticConfig;

      case BehaviorType.Transition:
        return this.state.transitionConfig;

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

  public isTransitionConfigActive(): boolean {
    return this.state.activeType === BehaviorType.Transition;
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
      | ScalarTransitionBehaviorConfig
      | ScalarStaticBehaviorConfig
      | ScriptBehaviorConfig<number | Point2d>
      | VectorBehaviorConfig
      | DeltaBehaviorConfig
      | undefined,
  ): void {
    if (config === undefined) {
      this.disable();
    } else if (isScalarTransitionBehaviorConfig(config)) {
      this.setTransitionConfig(config);
      this.setActiveConfigType(BehaviorType.Transition);
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
