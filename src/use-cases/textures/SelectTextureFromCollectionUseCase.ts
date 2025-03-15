import { injected } from "brandi";
import { Assets } from "pixi.js";
import bloomParticleTexture from "src/assets/bloom-particle.png";
import defaultParticleTexture from "src/assets/default.png";
import starTexture from "src/assets/star.png";
import waveTexture from "src/assets/wave.png";
import { DI_TOKENS } from "src/di/di.tokens";
import { CollectionTexture, ParticleTexture } from "src/stores/TexturesStore/TextureStore.types";
import { TexturesStore } from "src/stores/TexturesStore/TexturesStore";

export class SelectTextureFromCollectionUseCase {
  constructor(private readonly texturesStore: TexturesStore) {}

  public async select(textureKey: CollectionTexture): Promise<void> {
    const particleTexture = this.getParticleTexture(textureKey);

    await Assets.load(particleTexture.url);

    this.texturesStore.add(particleTexture);
  }

  public getParticleTexture(textureKey: CollectionTexture): ParticleTexture {
    switch (textureKey) {
      case CollectionTexture.DefaultParticle:
        return {
          url: defaultParticleTexture,
          name: CollectionTexture.DefaultParticle,
        };

      case CollectionTexture.Wave:
        return {
          url: waveTexture,
          name: CollectionTexture.Wave,
        };

      case CollectionTexture.Star:
        return {
          url: starTexture,
          name: CollectionTexture.Star,
        };

      case CollectionTexture.BloomParticle:
        return {
          url: bloomParticleTexture,
          name: CollectionTexture.BloomParticle,
        };
    }
  }
}

injected(SelectTextureFromCollectionUseCase, DI_TOKENS.texturesStore);
