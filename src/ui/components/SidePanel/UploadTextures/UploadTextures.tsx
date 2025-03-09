import React, { useRef } from "react";
import { useDropTextureUseCaseToken, useUploadTextureUseCaseToken } from "src/di/di.hooks";
import { useTexturesStore } from "src/hooks/connectors";
import { TexturesStore } from "src/stores/TexturesStore/TexturesStore";
import { Button, ButtonSize } from "src/ui/kit/Button/Button";
import { UploadIcon } from "src/ui/kit/icons/UploadIcon";
import { BehaviorHeader } from "../BehaviorHeader/BehaviorHeader";
import { BehaviorName } from "../BehaviorName/BehaviorName";
import { ItemContainer } from "../ItemContainer/ItemContainer";
import { TextureList } from "./TextureList";
import "./UploadTextures.style.scss";

export function UploadTextures() {
  const texturesStore = useTexturesStore();
  const textureList = texturesStore.getTextureList();
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadTextureUseCase = useUploadTextureUseCaseToken();
  const dropTextureUseCase = useDropTextureUseCaseToken();

  return (
    <ItemContainer>
      <BehaviorHeader left={<BehaviorName name="Textures" />} right={null} />

      <div>
        <TextureList textureList={textureList} onRemove={dropTextureUseCase.drop} />

        <Button size={ButtonSize.Medium} onClick={() => inputRef.current?.click()}>
          <div className="upload-button__content">
            <UploadIcon className="upload-button__icon" />
            <p className="upload-button__text">Upload</p>
          </div>
        </Button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={TexturesStore.acceptMimeTypes}
        className="upload-input"
        onChange={uploadTextureUseCase.upload}
      />
    </ItemContainer>
  );
}
