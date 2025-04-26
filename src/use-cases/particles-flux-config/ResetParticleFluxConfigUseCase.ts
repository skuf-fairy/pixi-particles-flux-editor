import { injected } from "brandi";
import { Assets } from "pixi.js";
import { DEFAULT_PARTICLE_CONFIG } from "src/constants";
import { DI_TOKENS } from "src/di/di.tokens";
import { ParticleFluxConfigStore } from "src/stores/ParticleFluxConfigStore";
import { TexturesStore } from "src/stores/TexturesStore/TexturesStore";

export class ResetParticleFluxConfigUseCase {
  constructor(
    private readonly particleFluxConfigStore: ParticleFluxConfigStore,
    private readonly texturesStore: TexturesStore
  ) {}

  public reset = async (): Promise<void> => {
    this.texturesStore.reset();
    const textures = this.texturesStore.getTextureList();

    for (const texture of textures) {
      await Assets.load(texture.url);
    }

    this.particleFluxConfigStore.restore(DEFAULT_PARTICLE_CONFIG);
  };
}

injected(ResetParticleFluxConfigUseCase, DI_TOKENS.particleFluxConfigStore, DI_TOKENS.texturesStore);
