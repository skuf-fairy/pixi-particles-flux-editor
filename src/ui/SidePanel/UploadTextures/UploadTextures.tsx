import cn from "classnames";
import React from "react";
import { TextureInput } from "../TextureInput/TextureInput";
import { TexturePreviewList } from "../TexturePreviewList/TexturePreviewList";
import "./UploadTextures.style.scss";

interface Props {
  className?: string;
}

export function UploadTextures({ className }: Props) {
  return (
    <section className={cn("upload-textures", className)}>
      <h2 className="upload-textures__title">Upload Textures</h2>

      <TexturePreviewList uploadButton={<TextureInput />} />
    </section>
  );
}
