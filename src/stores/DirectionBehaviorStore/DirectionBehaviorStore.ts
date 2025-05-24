import {DirectionBehaviorStoreState, DirectionConfigType} from './DirectionBehaviorStore.types';

import {
  DirectionConfig,
  RangeDirectionConfig,
  isDirectionRangeBehaviorConfig,
  isStaticDirectionBehaviorConfig,
  isSpawnBurstDirectionBehaviorConfig,
  SpawnBurstDirectionConfig,
  StaticDirectionConfig,
} from 'particle-flux';

import {Store} from '../Store';

export class DirectionBehaviorStore extends Store<DirectionBehaviorStoreState> {
  constructor() {
    super({
      staticConfig: {
        angle: 0,
        isRotateByDirection: false,
      },
      rangeConfig: {
        minAngle: 0,
        maxAngle: 360,
        isRotateByDirection: false,
      },
      spawnBurstConfig: {
        startAngle: 0,
        deltaAngle: Math.trunc(360 / 12),
        isRotateByDirection: false,
      },
      configActive: 'range',
    });
  }

  public isRotateByDirection(): boolean {
    return !!this.getActiveConfig()?.isRotateByDirection;
  }

  public toggleFollowDirection(): void {
    this.setRangeConfig({
      ...this.state.rangeConfig,
      isRotateByDirection: !this.state.rangeConfig.isRotateByDirection,
    });
  }

  public setRangeConfig(config: RangeDirectionConfig): void {
    this.setState({
      ...this.state,
      rangeConfig: config,
    });
  }

  public setSpawnBurstConfig(config: SpawnBurstDirectionConfig): void {
    this.setState({
      ...this.state,
      spawnBurstConfig: config,
    });
  }

  public setStaticConfig(config: StaticDirectionConfig): void {
    this.setState({
      ...this.state,
      staticConfig: config,
    });
  }

  public setConfigActive(configActive: DirectionConfigType): void {
    this.setState({
      ...this.state,
      configActive,
    });
  }

  public getActiveConfigType(): DirectionConfigType {
    return this.state.configActive;
  }

  public getActiveConfig(): DirectionConfig {
    if (this.state.configActive === 'static') {
      return this.state.staticConfig;
    }

    if (this.state.configActive === 'spawnBurst') {
      return this.state.spawnBurstConfig;
    }

    return this.state.rangeConfig;
  }

  public restore(config: DirectionConfig | undefined): void {
    if (config === undefined) {
      this.reset();
    } else if (isDirectionRangeBehaviorConfig(config)) {
      this.setState({
        ...this.state,
        rangeConfig: config,
        configActive: 'range',
      });
    } else if (isStaticDirectionBehaviorConfig(config)) {
      this.setState({
        ...this.state,
        staticConfig: config,
        configActive: 'static',
      });
    } else if (isSpawnBurstDirectionBehaviorConfig(config)) {
      this.setState({
        ...this.state,
        spawnBurstConfig: config,
        configActive: 'spawnBurst',
      });
    }
  }
}
