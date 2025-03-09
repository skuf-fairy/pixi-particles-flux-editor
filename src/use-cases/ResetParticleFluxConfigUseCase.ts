import { injected } from "brandi";
import { DI_TOKENS } from "src/di/di.tokens";
import { ParticleFluxConfigStore } from "src/stores/ParticleFluxConfigStore";
import { TexturesStore } from "src/stores/TexturesStore/TexturesStore";

export class ResetParticleFluxConfigUseCase {
  constructor(
    private readonly particleFluxConfigStore: ParticleFluxConfigStore,
    private readonly texturesStore: TexturesStore
  ) {}

  public reset = (): void => {
    this.texturesStore.reset();
    this.particleFluxConfigStore.reset();
  };
}

injected(ResetParticleFluxConfigUseCase, DI_TOKENS.particleFluxConfigStore, DI_TOKENS.texturesStore);
