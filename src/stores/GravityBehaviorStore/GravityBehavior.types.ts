import {ScalarStaticBehaviorConfig, ScalarTransitionBehaviorConfig} from 'particle-flux';

import {BehaviorType} from '../types';

export type GravityBehaviorType = BehaviorType.Transition | BehaviorType.Static;

export interface GravityBehaviorStoreState {
  scalarStaticBehaviorConfig: ScalarStaticBehaviorConfig;
  scalarTransitionBehaviorConfig: ScalarTransitionBehaviorConfig;
  activeType: GravityBehaviorType;
  availableTypes: GravityBehaviorType[];
  enabled: boolean;
}
