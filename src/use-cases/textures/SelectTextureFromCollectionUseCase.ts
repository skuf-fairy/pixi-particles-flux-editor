import { injected } from "brandi";
import { Assets } from "pixi.js";
import { DI_TOKENS } from "src/di/di.tokens";
import { CollectionTexture, ParticleTexture } from "src/stores/TexturesStore/TextureStore.types";
import { TexturesStore } from "src/stores/TexturesStore/TexturesStore";
import { AVAILABLE_TEXTURES } from "src/stores/TexturesStore/TexturesStore.constants";

export class SelectTextureFromCollectionUseCase {
  constructor(private readonly texturesStore: TexturesStore) {}

  public async select(textureName: CollectionTexture): Promise<void> {
    const particleTexture = this.getTexture(textureName);

    if (!particleTexture) return;

    await Assets.load(particleTexture.url);

    this.texturesStore.add(particleTexture);
  }

  private getTexture(textureName: CollectionTexture): ParticleTexture | undefined {
    return AVAILABLE_TEXTURES.find((t) => t.name === textureName);
  }
}

injected(SelectTextureFromCollectionUseCase, DI_TOKENS.texturesStore);
