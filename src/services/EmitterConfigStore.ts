import { EmitterConfig } from "particle-flux";
import { Store } from "./Store";

export class EmitterConfigStore extends Store<EmitterConfig> {
  constructor() {
    super({
      // spawnTime: 100,
      spawnInterval: {
        min: 1000,
        max: 2500,
      },
      spawnParticlesPerWave: 1,
      maxParticles: 500,
      spawnChance: 100,
    });
  }
}
