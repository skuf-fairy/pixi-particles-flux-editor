import {
  DirectionConfig,
  DirectionRangeConfig,
  StaticDirectionConfig,
  isDirectionRangeBehaviorConfig,
  isStaticDirectionBehaviorConfig,
} from "particle-flux";
import { Store } from "../Store";
import { BehaviorType } from "../types";

export class DirectionBehaviorStore extends Store<{
  rangeConfig: DirectionRangeConfig;
  staticConfig: StaticDirectionConfig;
  activeType: BehaviorType;
  availableTypes: BehaviorType[];
}> {
  constructor() {
    super({
      rangeConfig: {
        minAngle: 0,
        maxAngle: 360,
        isRotateByDirection: false,
      },
      staticConfig: {
        angle: 0,
        isRotateByDirection: false,
      },
      activeType: BehaviorType.Dynamic,
      availableTypes: [BehaviorType.Static, BehaviorType.Dynamic],
    });
  }

  public isFollowDirection(): boolean {
    return !!this.getActiveConfig()?.isRotateByDirection;
  }

  public toggleFollowDirection(): void {
    if (this.state.activeType === BehaviorType.Static) {
      return this.setStaticConfig({
        ...this.state.staticConfig,
        isRotateByDirection: !this.state.rangeConfig.isRotateByDirection,
      });
    }

    if (this.state.activeType === BehaviorType.Dynamic) {
      return this.setRangeConfig({
        ...this.state.rangeConfig,
        isRotateByDirection: !this.state.staticConfig.isRotateByDirection,
      });
    }
  }

  public setRangeConfig(config: DirectionRangeConfig): void {
    this.setState({
      ...this.state,
      rangeConfig: config,
    });
  }

  public setStaticConfig(config: StaticDirectionConfig): void {
    this.setState({
      ...this.state,
      staticConfig: config,
    });
  }

  public getActiveConfig(): DirectionConfig | undefined {
    if (this.state.activeType === BehaviorType.Static) {
      return this.state.staticConfig;
    }

    if (this.state.activeType === BehaviorType.Dynamic) {
      return this.state.rangeConfig;
    }
  }

  public setActiveConfigType(type: BehaviorType): void {
    this.setValue("activeType", type);
  }

  public restore(config: DirectionConfig): void {
    this.reset();

    if (isDirectionRangeBehaviorConfig(config)) {
      this.setRangeConfig(config);
      this.setActiveConfigType(BehaviorType.Dynamic);
    } else if (isStaticDirectionBehaviorConfig(config)) {
      this.setStaticConfig(config);
      this.setActiveConfigType(BehaviorType.Static);
    }
  }
}
