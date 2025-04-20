import {
  DirectionConfig,
  DirectionRangeConfig,
  StaticDirectionConfig,
  isDirectionRangeBehaviorConfig,
} from "particle-flux";
import { Store } from "../Store";
import { BehaviorType } from "../types";

export class DirectionBehaviorStore extends Store<{
  rangeConfig: DirectionRangeConfig;
  staticConfig: StaticDirectionConfig;
  isRotateByDirection: boolean;
  activeType: BehaviorType;
  availableTypes: BehaviorType[];
}> {
  constructor() {
    super({
      rangeConfig: {
        minAngle: 0,
        maxAngle: 360,
      },
      staticConfig: {
        angle: 0,
      },
      isRotateByDirection: false,
      activeType: BehaviorType.Dynamic,
      availableTypes: [BehaviorType.Static, BehaviorType.Dynamic],
    });
  }

  public isFollowDirection(): boolean {
    return this.state.isRotateByDirection;
  }

  public toggleFollowDirection(): void {
    this.setValue("isRotateByDirection", !this.isFollowDirection());
  }

  public setRangeAngle(config: DirectionRangeConfig): void {
    this.setState({
      ...this.state,
      rangeConfig: config,
    });
  }

  public setStaticAngle(config: StaticDirectionConfig): void {
    this.setState({
      ...this.state,
      staticConfig: config,
    });
  }

  public getActiveConfig(): DirectionConfig | undefined {
    if (this.state.activeType === BehaviorType.Static) {
      return { ...this.state.staticConfig, isRotateByDirection: this.state.isRotateByDirection };
    }

    if (this.state.activeType === BehaviorType.Dynamic) {
      return { ...this.state.rangeConfig, isRotateByDirection: this.state.isRotateByDirection };
    }
  }

  public restore(config: DirectionConfig): void {
    if (isDirectionRangeBehaviorConfig(config)) {
      this.setRangeAngle(config);
    } else if (isDirectionRangeBehaviorConfig(config)) {
      this.setStaticAngle(config);
    }
  }
}
