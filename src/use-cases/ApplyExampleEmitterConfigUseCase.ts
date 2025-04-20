import { injected } from "brandi";
import { Assets } from "pixi.js";
import { DI_TOKENS } from "src/di/di.tokens";
import { Example } from "src/examples/examples";
import { ParticleFluxConfigStore } from "src/stores/ParticleFluxConfigStore";
import { CollectionTexture, ParticleTexture } from "src/stores/TexturesStore/TextureStore.types";
import { TexturesStore } from "src/stores/TexturesStore/TexturesStore";
import { AVAILABLE_TEXTURES } from "src/stores/TexturesStore/TexturesStore.constants";

export class ApplyExampleEmitterConfigUseCase {
  constructor(
    private readonly particleFluxConfigStore: ParticleFluxConfigStore,
    private readonly texturesStore: TexturesStore
  ) {}

  public applyExample = async (example: Example): Promise<void> => {
    const textures: ParticleTexture[] = [];

    for (const textureName of example.textures) {
      const url = this.getTexture(textureName)?.url;

      if (url) {
        await Assets.load(url);

        textures.push({
          name: textureName,
          url,
        });
      }
    }

    this.texturesStore.set(textures);

    this.particleFluxConfigStore.restore(example.config);
  };

  private getTexture(textureName: CollectionTexture): ParticleTexture | undefined {
    return AVAILABLE_TEXTURES.find((t) => t.name === textureName);
  }
}

injected(ApplyExampleEmitterConfigUseCase, DI_TOKENS.particleFluxConfigStore, DI_TOKENS.texturesStore);
