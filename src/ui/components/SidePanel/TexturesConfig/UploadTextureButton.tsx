import React, { useRef } from "react";
import { useUploadTextureUseCaseToken } from "src/di/di.hooks";
import { TexturesStore } from "src/stores/TexturesStore/TexturesStore";
import { Button, ButtonSize, ButtonStyleType } from "src/ui/kit/Button/Button";
import { UploadIcon } from "src/ui/kit/icons/UploadIcon";
import "./UploadTextureButton.style.scss";

export function UploadTextureButton() {
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadTextureUseCase = useUploadTextureUseCaseToken();

  return (
    <>
      <Button
        styleType={ButtonStyleType.Primary}
        size={ButtonSize.Medium}
        onClick={() => inputRef.current?.click()}
        className="upload-button"
      >
        <div className="upload-button__content">
          <UploadIcon className="upload-button__icon" />
          <p className="upload-button__text">Upload</p>
        </div>
      </Button>
      <input
        ref={inputRef}
        type="file"
        // @ts-ignore
        accept={TexturesStore.acceptMimeTypes}
        className="upload-input"
        onChange={uploadTextureUseCase.upload}
      />
    </>
  );
}
