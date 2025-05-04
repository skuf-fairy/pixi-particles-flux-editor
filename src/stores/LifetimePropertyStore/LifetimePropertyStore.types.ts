import {LifeTimeRangeBehaviorConfig, LifeTimeStaticBehaviorConfig} from 'particle-flux';

import {PropertyType} from '../types';

export interface LifetimePropertyStoreState {
  rangeConfig: LifeTimeRangeBehaviorConfig;
  staticConfig: LifeTimeStaticBehaviorConfig;
  activeType: PropertyType;
  availableTypes: PropertyType[];
}
