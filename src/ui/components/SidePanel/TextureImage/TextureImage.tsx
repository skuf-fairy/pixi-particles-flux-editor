import React from "react";
import { Close } from "src/ui/components/icons/Close";
import "./TextureImage.style.scss";

interface TextureImageProps {
  src: string;
  isDropImageAvailable: boolean;
  onDropClick: (src: string) => void;
}

export function TextureImage({ src, onDropClick, isDropImageAvailable }: TextureImageProps) {
  return (
    <div className="texture-image">
      {isDropImageAvailable && (
        <button onPointerUp={() => onDropClick(src)} className="texture-image__close">
          <Close />
        </button>
      )}
      <img src={src} alt="Close" className="texture-image__image" />
    </div>
  );
}
