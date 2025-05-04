import {RangeValue} from 'particle-flux';

import {PropertyType} from '../types';

export interface EmitterConfigStoreState {
  spawnIntervalStatic: number;
  spawnIntervalRange: RangeValue;
  spawnIntervalType: PropertyType;
  spawnTime: number;
  spawnTimeout: number;
  maxParticles: number;
  spawnParticlesPerWave: number;
  spawnChance: number;
}
