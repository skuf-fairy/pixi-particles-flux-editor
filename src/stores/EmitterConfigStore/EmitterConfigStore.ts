import {EmitterConfigStoreState} from './EmitterConfigStore.types';

import {EmitterConfig, RangeValue, isRangeValue} from 'particle-flux';

import {Store} from '../Store';
import {PropertyType} from '../types';

export class EmitterConfigStore extends Store<EmitterConfigStoreState> {
  constructor() {
    super({
      spawnIntervalStatic: 250,
      spawnIntervalRange: {
        min: 250,
        max: 500,
      },
      spawnIntervalType: PropertyType.Static,
      spawnParticlesPerWave: 1,
      maxParticles: 500,
      spawnChance: 100,
      spawnTimeout: 0,
      spawnTime: 0,
    });
  }

  public restore(config: EmitterConfig): void {
    this.reset();

    const {spawnChance, spawnParticlesPerWave, maxParticles, spawnInterval, spawnTime, spawnTimeout} = config;

    if (spawnInterval) {
      if (isRangeValue(spawnInterval)) {
        this.setValue('spawnIntervalRange', spawnInterval);
        this.setValue('spawnIntervalType', PropertyType.Range);
      } else {
        this.setValue('spawnIntervalStatic', spawnInterval);
        this.setValue('spawnIntervalType', PropertyType.Static);
      }
    }

    if (spawnChance !== undefined) {
      this.setValue('spawnChance', spawnChance);
    }

    if (spawnParticlesPerWave !== undefined) {
      this.setValue('spawnParticlesPerWave', spawnParticlesPerWave);
    }

    if (maxParticles !== undefined) {
      this.setValue('maxParticles', maxParticles);
    }

    if (spawnTime !== undefined) {
      this.setValue('spawnTime', spawnTime);
    }

    if (spawnTimeout !== undefined) {
      this.setValue('spawnTimeout', spawnTimeout);
    }
  }

  public setActiveSpawnType(type: PropertyType): void {
    this.setValue('spawnIntervalType', type);
  }

  public getSpawnIntervalType(): PropertyType {
    return this.state.spawnIntervalType;
  }

  public getSpawnIntervalRange(): RangeValue {
    return this.state.spawnIntervalRange;
  }

  public getSpawnIntervalStatic(): number {
    return this.state.spawnIntervalStatic;
  }

  public setSpawnInterval(spawnInterval: RangeValue | number): void {
    if (isRangeValue(spawnInterval)) {
      this.setState({
        ...this.state,
        spawnIntervalRange: spawnInterval,
      });
    } else {
      this.setState({
        ...this.state,
        spawnIntervalStatic: spawnInterval,
      });
    }
  }

  public getConfig(): EmitterConfig {
    const {spawnIntervalStatic, spawnIntervalRange, spawnIntervalType, ...rest} = this.state;

    if (spawnIntervalType === PropertyType.Static) {
      return {
        ...rest,
        spawnInterval: spawnIntervalStatic,
      };
    }
    return {
      ...rest,
      spawnInterval: spawnIntervalRange,
    };
  }
}
