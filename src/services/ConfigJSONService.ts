import { injected } from "brandi";
import { ParticleFluxConfig } from "particle-flux";
import { DI_TOKENS } from "src/di/di.tokens";
import { ParticleFluxConfigStore } from "src/stores/ParticleFluxConfigStore";

export class ConfigJSONService {
  constructor(private readonly particleFluxConfigStore: ParticleFluxConfigStore) {}

  public getStringifiedConfig() {
    return JSON.stringify(this.particleFluxConfigStore.getState(), null, 2);
  }

  public fromStringifiedConfig(config: string): void {
    console.log("config", config);
    try {
      const particleFluxConfig = JSON.parse(config) as ParticleFluxConfig;
      console.log("2", particleFluxConfig);

      this.particleFluxConfigStore.restore(particleFluxConfig);
    } catch (e) {
      //todo
      console.log(e);
    }
  }
}

injected(ConfigJSONService, DI_TOKENS.particleFluxConfigStore);
