import { EmitterConfig } from "particle-flux";
import { Store } from "./Store";

export class EmitterConfigStore extends Store<EmitterConfig> {
  constructor() {
    super({
      spawnInterval: {
        min: 250,
        max: 500,
      },
      spawnParticlesPerWave: 1,
      maxParticles: 500,
      spawnChance: 100,
      autoStart: true,
    });
  }

  public restore(config: EmitterConfig): void {
    const { spawnChance, spawnParticlesPerWave, maxParticles, spawnInterval } = config;

    this.setState({
      ...this.state,
      spawnChance,
      spawnParticlesPerWave,
      maxParticles,
      spawnInterval,
    });
  }
}
