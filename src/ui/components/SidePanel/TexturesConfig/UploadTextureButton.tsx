import {useUploadTextureUseCaseToken} from 'src/di/di.hooks';

import React, {useRef} from 'react';

import {TexturesStore} from 'src/stores/TexturesStore/TexturesStore';
import {Button, ButtonSize, ButtonStyleType} from 'src/ui/kit/Button/Button';
import {UploadIcon} from 'src/ui/kit/icons/UploadIcon';

import s from './UploadTextureButton.module.css';

export function UploadTextureButton() {
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadTextureUseCase = useUploadTextureUseCaseToken();

  return (
    <>
      <Button styleType={ButtonStyleType.Primary} size={ButtonSize.Medium} onClick={() => inputRef.current?.click()}>
        <div className={s.content}>
          <UploadIcon className={s.icon} />
          <p className={s.text}>Upload</p>
        </div>
      </Button>
      <input
        ref={inputRef}
        type="file"
        // @ts-ignore
        accept={TexturesStore.acceptMimeTypes}
        className={s.uploadInput}
        onChange={uploadTextureUseCase.upload}
      />
    </>
  );
}
