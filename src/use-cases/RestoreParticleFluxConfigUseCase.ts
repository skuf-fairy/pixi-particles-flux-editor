import { injected } from "brandi";
import { ParticleFluxConfig } from "particle-flux";
import { ChangeEvent } from "react";
import { DI_TOKENS } from "src/di/di.tokens";
import { ParticleFluxConfigStore } from "src/stores/ParticleFluxConfigStore";
import { JSONUtils } from "src/utils/JSONUtils";
import { ReaderContentType, SaveLoadUtils } from "src/utils/SaveLoadUtils";

export class RestoreParticleFluxConfigUseCase {
  constructor(private readonly particleFluxConfigStore: ParticleFluxConfigStore) {}

  public restore = async (e: ChangeEvent<HTMLInputElement>) => {
    // todo error
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (file && file.type === "application/json") {
      const content = await SaveLoadUtils.uploadFile(file, ReaderContentType.Text);

      if (typeof content === "string") {
        const config = JSONUtils.parse<ParticleFluxConfig>(content);

        this.particleFluxConfigStore.restore(config);
      }
    }
  };
}

injected(RestoreParticleFluxConfigUseCase, DI_TOKENS.particleFluxConfigStore);
