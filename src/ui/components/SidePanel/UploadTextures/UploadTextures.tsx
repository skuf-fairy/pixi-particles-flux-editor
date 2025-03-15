import React, { useRef } from "react";
import {
  useDropTextureUseCaseToken,
  useSelectTextureFromCollectionUseCaseToken,
  useUploadTextureUseCaseToken,
} from "src/di/di.hooks";
import { useTexturesStore } from "src/hooks/connectors";
import { CollectionTexture } from "src/stores/TexturesStore/TextureStore.types";
import { TexturesStore } from "src/stores/TexturesStore/TexturesStore";
import { Button, ButtonSize } from "src/ui/kit/Button/Button";
import { DropDown, DropDownSize } from "src/ui/kit/DropDown/DropDown";
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
  const selectTextureFromCollectionUseCase = useSelectTextureFromCollectionUseCaseToken();

  return (
    <ItemContainer>
      <BehaviorHeader left={<BehaviorName name="Textures" />} right={null} />

      <div>
        <TextureList textureList={textureList} onRemove={dropTextureUseCase.drop} />

        <div className="upload-panel">
          <Button size={ButtonSize.Medium} onClick={() => inputRef.current?.click()} className="upload-button">
            <div className="upload-button__content">
              <UploadIcon className="upload-button__icon" />
              <p className="upload-button__text">Upload</p>
            </div>
          </Button>

          <DropDown
            value={{ key: "Add from collection", value: "Add from collection" }}
            options={Object.values(CollectionTexture).map((e) => ({ value: e, key: e }))}
            onChange={(v) => selectTextureFromCollectionUseCase.select(v.key as CollectionTexture)}
            size={DropDownSize.Medium}
          />
        </div>
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
