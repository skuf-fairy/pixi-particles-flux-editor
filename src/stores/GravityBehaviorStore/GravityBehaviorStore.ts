import {GravityBehaviorStoreState} from './GravityBehavior.types';

import {
  EasingName,
  GravityBehaviorConfig,
  ScalarStaticBehaviorConfig,
  ScalarTransitionBehaviorConfig,
  isScalarStaticBehaviorConfig,
  isScalarTransitionBehaviorConfig,
} from 'particle-flux';

import {Store} from '../Store';
import {BehaviorType} from '../types';

export class GravityBehaviorStore extends Store<GravityBehaviorStoreState> {
  constructor() {
    super({
      scalarTransitionBehaviorConfig: {
        start: 0,
        end: 1,
        multiplier: 1,
        easing: EasingName.linear,
      },
      scalarStaticBehaviorConfig: {
        value: 0.3,
      },
      activeType: BehaviorType.Static,
      availableTypes: [BehaviorType.Static, BehaviorType.Transition],
      enabled: false,
    });
  }

  public setDynamicConfig(config: ScalarTransitionBehaviorConfig): void {
    this.setState({...this.state, scalarTransitionBehaviorConfig: config});
  }

  public setStaticConfig(config: ScalarStaticBehaviorConfig): void {
    this.setState({...this.state, scalarStaticBehaviorConfig: config});
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

  public getActiveConfig(): GravityBehaviorConfig | undefined {
    if (!this.isEnabled()) return;

    switch (this.state.activeType) {
      case BehaviorType.Static:
        return this.state.scalarStaticBehaviorConfig;

      case BehaviorType.Transition:
        return this.state.scalarTransitionBehaviorConfig;
    }
  }

  public setActiveConfigType(type: BehaviorType.Transition | BehaviorType.Static): void {
    this.setState({
      ...this.state,
      activeType: type,
    });
  }

  public restore(config: GravityBehaviorConfig | undefined): void {
    if (config === undefined) {
      this.disable();
    } else if (isScalarTransitionBehaviorConfig(config)) {
      this.setDynamicConfig(config);
      this.setActiveConfigType(BehaviorType.Transition);
      this.enable();
    } else if (isScalarStaticBehaviorConfig(config)) {
      this.setStaticConfig(config);
      this.setActiveConfigType(BehaviorType.Static);
      this.enable();
    }
  }
}
