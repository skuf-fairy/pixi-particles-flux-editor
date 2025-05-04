import {LifetimePropertyStoreState} from './LifetimePropertyStore.types';

import {
  LifeTimeBehaviorConfig,
  LifeTimeRangeBehaviorConfig,
  LifeTimeStaticBehaviorConfig,
  isLifeTimeRangeBehaviorConfig,
  isLifeTimeStaticBehaviorConfig,
} from 'particle-flux';

import {Store} from '../Store';
import {PropertyType} from '../types';

export class LifetimePropertyStore extends Store<LifetimePropertyStoreState> {
  constructor() {
    super({
      rangeConfig: {
        min: 500,
        max: 1500,
      },
      staticConfig: {
        value: 500,
      },
      activeType: PropertyType.Static,
      availableTypes: [PropertyType.Static, PropertyType.Range],
    });
  }

  public setRangeConfig(config: LifeTimeRangeBehaviorConfig) {
    this.setState({
      ...this.state,
      rangeConfig: config,
    });
  }

  public setStaticConfig(config: LifeTimeStaticBehaviorConfig) {
    this.setState({
      ...this.state,
      staticConfig: config,
    });
  }

  public getActiveConfig(): LifeTimeBehaviorConfig {
    if (this.state.activeType === PropertyType.Static) {
      return this.state.staticConfig;
    }

    return this.state.rangeConfig;
  }

  public setActiveType(type: PropertyType): void {
    this.setValue('activeType', type);
  }

  public getActiveType(): PropertyType {
    return this.state.activeType;
  }

  public restore(config: LifeTimeBehaviorConfig | undefined): void {
    if (config === undefined) return;

    if (isLifeTimeStaticBehaviorConfig(config)) {
      this.setStaticConfig(config);
      this.setActiveType(PropertyType.Static);
    } else if (isLifeTimeRangeBehaviorConfig(config)) {
      this.setRangeConfig(config);
      this.setActiveType(PropertyType.Range);
    }
  }
}
