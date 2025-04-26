import React from "react";
import { useDropTextureUseCaseToken } from "src/di/di.hooks";
import { useTexturesStore } from "src/hooks/connectors";
import { BehaviorHeader } from "../BehaviorHeader/BehaviorHeader";
import { BehaviorName } from "../BehaviorName/BehaviorName";
import { ItemContainer } from "../ItemContainer/ItemContainer";
import { DownloadTexturesButton } from "./DownloadTexturesButton";
import { SelectFromGallery } from "./SelectFromGallery";
import { TextureList } from "./TextureList";
import "./TexturesConfig.style.scss";
import { UploadTextureButton } from "./UploadTextureButton";

export function TexturesConfig() {
  const texturesStore = useTexturesStore();
  const textureList = texturesStore.getTextureList();

  const dropTextureUseCase = useDropTextureUseCaseToken();

  return (
    <ItemContainer>
      <BehaviorHeader left={<BehaviorName name="Textures" />} right={null} />

      <div>
        <TextureList textureList={textureList} onRemove={dropTextureUseCase.drop} />

        <div className="upload-panel">
          <div className="upload-panel__button">
            <UploadTextureButton />
          </div>
          <div className="upload-panel__button">
            <SelectFromGallery />
          </div>
          <div className="upload-panel__button">
            <DownloadTexturesButton />
          </div>
        </div>
      </div>
    </ItemContainer>
  );
}
