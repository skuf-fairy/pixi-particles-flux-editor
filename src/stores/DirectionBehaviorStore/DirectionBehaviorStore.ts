import {
  DirectionBehaviorConfig,
  DirectionRangeBehaviorConfig,
  StaticDirectionBehaviorConfig,
  isDirectionRangeBehaviorConfig,
} from "particle-flux";
import { Store } from "../Store";
import { BehaviorType } from "../types";

export class DirectionBehaviorStore extends Store<{
  rangeConfig: DirectionRangeBehaviorConfig;
  staticConfig: StaticDirectionBehaviorConfig;
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

  public setRangeAngle(config: DirectionRangeBehaviorConfig): void {
    this.setState({
      ...this.state,
      rangeConfig: config,
    });
  }

  public setStaticAngle(config: StaticDirectionBehaviorConfig): void {
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

  public getActiveConfig(): DirectionBehaviorConfig | undefined {
    if (!this.isEnabled()) return;

    if (this.state.activeType === BehaviorType.Static) {
      return this.state.staticConfig;
    }

    if (this.state.activeType === BehaviorType.Dynamic) {
      return this.state.rangeConfig;
    }
  }

  public restore(config: DirectionBehaviorConfig): void {
    if (isDirectionRangeBehaviorConfig(config)) {
      this.setRangeAngle(config);
      this.enable();
    } else if (isDirectionRangeBehaviorConfig(config)) {
      this.setStaticAngle(config);
      this.enable();
    }
  }
}
