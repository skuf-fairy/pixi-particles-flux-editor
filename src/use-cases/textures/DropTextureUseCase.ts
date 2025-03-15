import { injected } from "brandi";
import { DI_TOKENS } from "src/di/di.tokens";
import { ParticleTexture } from "src/stores/TexturesStore/TextureStore.types";
import { TexturesStore } from "src/stores/TexturesStore/TexturesStore";

export class DropTextureUseCase {
  constructor(private readonly texturesStore: TexturesStore) {}

  public drop = (file: ParticleTexture): void => {
    this.texturesStore.drop(file.name);
  };
}

injected(DropTextureUseCase, DI_TOKENS.texturesStore);
