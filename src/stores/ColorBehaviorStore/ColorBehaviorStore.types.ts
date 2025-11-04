import {ColorTransitionBehaviorConfig, ColorStaticBehaviorConfig, ScriptBehaviorConfig} from 'particle-flux';

import {BehaviorType} from '../types';

export type ColorBehaviorType = BehaviorType.Static | BehaviorType.Transition | BehaviorType.Script;

export interface BehaviorStoreState {
  staticConfig: ColorStaticBehaviorConfig;
  transitionConfig: ColorTransitionBehaviorConfig;
  scriptConfig: ScriptBehaviorConfig<string>;
  activeType: ColorBehaviorType;
  availableTypes: ColorBehaviorType[];
  enabled: boolean;
}
