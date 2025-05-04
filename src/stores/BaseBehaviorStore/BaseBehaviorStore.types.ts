import {
  DeltaBehaviorConfig,
  NumberScriptBehaviorConfig,
  ScalarStaticBehaviorConfig,
  ScalarTransitionBehaviorConfig,
  VectorBehaviorConfig,
} from 'particle-flux';

import {BehaviorType} from '../types';

export interface BaseBehaviorStoreState {
  staticConfig: ScalarStaticBehaviorConfig;
  transitionConfig: ScalarTransitionBehaviorConfig;
  vectorConfig: VectorBehaviorConfig;
  scriptConfig: NumberScriptBehaviorConfig;
  deltaConfig: DeltaBehaviorConfig;
  activeType: BehaviorType;
  availableBehaviorTypes: BehaviorType[];
  enabled: boolean;
}
