import { DirectionBehaviorConfig, DirectionRangeBehaviorConfig } from "particle-flux";
import { Store } from "../Store";

export class DirectionBehaviorStore extends Store<{
  rangeConfig: DirectionRangeBehaviorConfig;
  enabled: boolean;
}> {
  constructor() {
    super({
      rangeConfig: {
        minAngle: 0,
        maxAngle: 360,
      },
      enabled: true,
    });
  }

  public setRangeAngle(config: DirectionRangeBehaviorConfig): void {
    this.setState({
      ...this.state,
      rangeConfig: config,
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

    return this.state.rangeConfig;
  }
}
