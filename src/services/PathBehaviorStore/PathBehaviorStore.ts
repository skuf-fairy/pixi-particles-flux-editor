import { PathBehaviorConfig } from "particle-flux";
import { Store } from "../Store";

export class PathBehaviorStore extends Store<{
  config: PathBehaviorConfig;
  enabled: boolean;
}> {
  constructor() {
    super({
      config: {
        path: "sin(x)",
      },
      enabled: false,
    });
  }

  public setPath(path: string): void {
    this.setState({ ...this.state, config: { path } });
  }

  public getPath(): string {
    return this.state.config.path;
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

  public getActiveConfig(): PathBehaviorConfig | undefined {
    if (!this.isEnabled()) return;

    return this.state.config;
  }
}
