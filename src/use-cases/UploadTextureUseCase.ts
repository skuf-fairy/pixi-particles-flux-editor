import { injected } from "brandi";
import { Assets } from "pixi.js";
import { ChangeEvent } from "react";
import { DI_TOKENS } from "src/di/di.tokens";
import { TexturesStore } from "src/stores/TexturesStore/TexturesStore";
import { ReaderContentType, SaveLoadUtils } from "src/utils/SaveLoadUtils";

export class UploadTextureUseCase {
  constructor(private readonly texturesStore: TexturesStore) {}

  public upload = async (e: ChangeEvent<HTMLInputElement>) => {
    // todo error
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (file) {
      const url = await SaveLoadUtils.uploadFile(file, ReaderContentType.URL);

      if (typeof url === "string") {
        await Assets.load(url);

        this.texturesStore.add({
          url: url,
          name: file.name,
        });
      }
    }
  };
}

injected(UploadTextureUseCase, DI_TOKENS.texturesStore);
