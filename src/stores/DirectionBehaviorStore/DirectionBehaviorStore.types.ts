import {RangeDirectionConfig, SpawnBurstDirectionConfig, StaticDirectionConfig} from 'particle-flux';

export interface DirectionBehaviorStoreState {
  staticConfig: StaticDirectionConfig;
  rangeConfig: RangeDirectionConfig;
  spawnBurstConfig: SpawnBurstDirectionConfig;
  configActive: DirectionConfigType;
}

export type DirectionConfigType = 'static' | 'range' | 'spawnBurst';
