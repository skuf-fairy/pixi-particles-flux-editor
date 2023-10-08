import React, { useRef } from "react";
import { useEmitterConfig } from "src/di/di.hooks";
import { Add } from "src/ui/components/icons/Add";
import "./TextureInput.style.scss";

export function TextureInput() {
  const emitterConfig = useEmitterConfig();
  const inputRef = useRef<HTMLInputElement>();

  return (
    <div className="texture-input">
      <input
        id="upload-texture"
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg"
        className="texture-input__input"
        onChange={(e) => {
          console.log(e.target.value);
          console.log(inputRef.current.files);

          if (!inputRef.current) return;

          const curFiles = inputRef.current.files;

          emitterConfig.pushTexture(curFiles[0]);
        }}
      />

      <label htmlFor="upload-texture" className="texture-input__label">
        <Add className="texture-input__upload-icon" />
      </label>
    </div>
  );
}
