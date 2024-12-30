import { EmitterConfig } from "particle-flux";
import { Store } from "./Store";

export class EmitterConfigStore extends Store<EmitterConfig> {
  constructor() {
    super({
      // spawnTime: 100,
      spawnInterval: 100,
      spawnParticlesPerWave: 1,
      maxParticles: 500,
      spawnChance: 100,
    });
  }

  // NO DROP
  // public getStringifyExcludedTexturesConfig() {
  //   const behaviors = this.config.behaviors.filter((b) => !this.configTextureTypeNameList.includes(b.type));
  //   const validJSONConfig = { ...this.config, behaviors };
  //   return JSON.stringify(validJSONConfig, null, 2);
  // }

  // public setConfigFromStringAndMergeTextures(config: string) {
  //   this.config = JSON.parse(config);

  //   this.emit();
  // }
}
