import {BehaviorStoreState, ColorBehaviorType} from './ColorBehaviorStore.types';

import {
  ColorBehaviorConfig,
  ColorTransitionBehaviorConfig,
  ColorStaticBehaviorConfig,
  ScriptBehaviorConfig,
  isColorTransitionBehaviorConfig,
  isColorStaticBehaviorConfig,
  isScriptBehaviorConfig,
} from 'particle-flux';

import {Store} from '../Store';
import {BehaviorType} from '../types';

export class ColorBehaviorStore extends Store<BehaviorStoreState> {
  constructor() {
    super({
      staticConfig: {
        value: '#ffffff',
      },
      transitionConfig: {
        start: '#ffffff',
        end: '#9ed1f0',
      },
      scriptConfig: {
        script: [
          {time: 0, value: '#ffffff'},
          {time: 100, value: '#ffffff'},
        ],
      },
      activeType: BehaviorType.Static,
      enabled: true,
      availableTypes: [BehaviorType.Static, BehaviorType.Transition, BehaviorType.Script],
    });
  }

  public setStaticConfig(staticConfig: ColorStaticBehaviorConfig): void {
    this.setState({...this.state, staticConfig});
  }

  public getActiveType(): ColorBehaviorType {
    return this.state.activeType;
  }

  public getAvailableTypes(): ColorBehaviorType[] {
    return this.state.availableTypes;
  }

  public setTransitionConfig(transitionConfig: ColorTransitionBehaviorConfig): void {
    this.setState({...this.state, transitionConfig});
  }

  public setScriptConfig(scriptConfig: ScriptBehaviorConfig<string>): void {
    this.setState({...this.state, scriptConfig});
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

  public setAvailableTypes(types: ColorBehaviorType[]): void {
    this.setState({...this.state, availableTypes: types});
  }

  public setActiveConfigType(type: ColorBehaviorType): void {
    this.setState({
      ...this.state,
      activeType: type,
    });
  }

  public getActiveConfig():
    | ColorTransitionBehaviorConfig
    | ColorStaticBehaviorConfig
    | ScriptBehaviorConfig<string>
    | undefined {
    if (!this.isEnabled()) return;

    switch (this.state.activeType) {
      case BehaviorType.Static:
        return this.state.staticConfig;

      case BehaviorType.Transition:
        return this.state.transitionConfig;

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

  public restore(config: ColorBehaviorConfig | undefined): void {
    if (config === undefined) {
      this.disable();
    } else if (isColorTransitionBehaviorConfig(config)) {
      this.setTransitionConfig(config);
      this.setActiveConfigType(BehaviorType.Transition);
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
