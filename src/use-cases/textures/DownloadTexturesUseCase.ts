import { injected } from "brandi";
import { DI_TOKENS } from "src/di/di.tokens";
import { TexturesStore } from "src/stores/TexturesStore/TexturesStore";
import { SaveLoadUtils } from "src/utils/SaveLoadUtils";

export class DownloadTexturesUseCase {
  constructor(private readonly texturesStore: TexturesStore) {}

  public download = (): void => {
    const texturesList = this.texturesStore.getTextureList();

    SaveLoadUtils.downloadTextures(texturesList);
  };
}

injected(DownloadTexturesUseCase, DI_TOKENS.texturesStore);
