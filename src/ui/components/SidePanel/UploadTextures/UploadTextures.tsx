import { Assets } from "pixi.js";
import React, { useRef } from "react";
import { useTexturesStore } from "src/hooks/connectors";
import { useUploadFile } from "src/hooks/useUploadFile";
import { ParticleTexture, TexturesStore } from "src/stores/TexturesStore/TexturesStore";
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
  const uploadFile = useUploadFile();

  const handleUpload = async () => {
    if (!inputRef.current?.files) return;

    const file = inputRef.current.files[0];

    const url = (await uploadFile(file)) as string;

    await Assets.load(url);

    texturesStore.add({
      url: url,
      name: file.name,
    });
  };

  const handleRemove = (file: ParticleTexture) => {
    texturesStore.drop(file.name);
  };

  return (
    <ItemContainer>
      <BehaviorHeader left={<BehaviorName name="Textures" />} right={null} />

      <div>
        <TextureList textureList={textureList} onRemove={handleRemove} />

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
        onChange={handleUpload}
      />
    </ItemContainer>
  );
}
