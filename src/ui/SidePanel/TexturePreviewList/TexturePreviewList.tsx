import React, { ReactNode } from "react";
import { useEmitterConfig } from "src/di/di.hooks";
import { useTextures } from "src/hooks/useTextures";
import { TextureImage } from "../TextureImage/TextureImage";
import "./TexturePreviewList.style.scss";

interface Props {
  uploadButton: ReactNode;
}

export function TexturePreviewList({ uploadButton }: Props) {
  const emitterConfig = useEmitterConfig();
  const textureList = useTextures();
  console.log(textureList);
  return (
    <ul className="textures-preview-list">
      {textureList.map((texture) => (
        <TextureImage
          key={texture}
          src={texture}
          isDropImageAvailable={textureList.length !== 1}
          onDropClick={emitterConfig.removeTexture}
        />
      ))}
      {uploadButton}
    </ul>
  );
}
