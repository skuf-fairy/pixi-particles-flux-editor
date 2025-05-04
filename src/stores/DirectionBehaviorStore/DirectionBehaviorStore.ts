import {DirectionBehaviorStoreState} from './DirectionBehaviorStore.types';

import {
  DirectionConfig,
  RangeDirectionConfig,
  StaticDirectionConfig,
  isDirectionRangeBehaviorConfig,
  isStaticDirectionBehaviorConfig,
} from 'particle-flux';

import {Store} from '../Store';
import {BehaviorType} from '../types';

export class DirectionBehaviorStore extends Store<DirectionBehaviorStoreState> {
  constructor() {
    super({
      rangeConfig: {
        minAngle: 0,
        maxAngle: 360,
        isRotateByDirection: false,
      },
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

  public getActiveConfig(): DirectionConfig | undefined {
    return this.state.rangeConfig;
  }

  public restore(config: DirectionConfig | undefined): void {
    if (config === undefined) {
      this.reset();
    } else if (isDirectionRangeBehaviorConfig(config)) {
      this.setRangeConfig(config);
    } else if (isStaticDirectionBehaviorConfig(config)) {
      this.setRangeConfig({
        minAngle: config.angle,
        maxAngle: config.angle,
        isRotateByDirection: config.isRotateByDirection,
      });
    }
  }
}
