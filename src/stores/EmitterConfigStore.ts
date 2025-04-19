import { EmitterConfig } from "particle-flux";
import { Store } from "./Store";

export class EmitterConfigStore extends Store<EmitterConfig> {
  constructor() {
    super({
      spawnInterval: 250,
      spawnParticlesPerWave: 1,
      maxParticles: 500,
      spawnChance: 100,
      spawnTimeout: 0,
      spawnTime: 6000000,
      autoStart: true,
    });
  }

  public restore(config: EmitterConfig): void {
    const { spawnChance, spawnParticlesPerWave, maxParticles, spawnInterval, spawnTime, spawnTimeout } = config;

    this.setState({
      ...this.state,
      spawnChance,
      spawnParticlesPerWave,
      maxParticles,
      spawnInterval,
      spawnTime,
      spawnTimeout,
    });
  }

  public getConfig(): EmitterConfig {
    return this.state;
  }
}
