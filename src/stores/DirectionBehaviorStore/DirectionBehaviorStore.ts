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
  activeType: BehaviorType;
  availableTypes: BehaviorType[];
  enabled: boolean;
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
      activeType: BehaviorType.Dynamic,
      availableTypes: [BehaviorType.Static, BehaviorType.Dynamic],
      enabled: true,
    });
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

  public isEnabled(): boolean {
    return this.state.enabled;
  }

  public enable(): void {
    this.setState({ ...this.state, enabled: true });
  }

  public disable(): void {
    this.setState({ ...this.state, enabled: false });
  }

  public getActiveConfig(): DirectionConfig | undefined {
    if (!this.isEnabled()) return;

    if (this.state.activeType === BehaviorType.Static) {
      return this.state.staticConfig;
    }

    if (this.state.activeType === BehaviorType.Dynamic) {
      return this.state.rangeConfig;
    }
  }

  public restore(config: DirectionConfig): void {
    if (isDirectionRangeBehaviorConfig(config)) {
      this.setRangeAngle(config);
      this.enable();
    } else if (isDirectionRangeBehaviorConfig(config)) {
      this.setStaticAngle(config);
      this.enable();
    }
  }
}
