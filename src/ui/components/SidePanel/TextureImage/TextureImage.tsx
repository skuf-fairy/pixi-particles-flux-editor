import React from 'react';

import {Close} from 'src/ui/components/icons/Close';
import {Button, ButtonStyleType} from 'src/ui/kit/Button/Button';

import s from './TextureImage.module.css';

interface TextureImageProps {
  src: string;
  isDropImageAvailable: boolean;
  onDropClick: (src: string) => void;
}

export function TextureImage({src, onDropClick, isDropImageAvailable}: TextureImageProps) {
  return (
    <div className={s.root}>
      {isDropImageAvailable && (
        <Button styleType={ButtonStyleType.Common} onClick={() => onDropClick(src)} className={s.close}>
          <Close />
        </Button>
      )}
      <img src={src} alt="Close" className={s.image} />
    </div>
  );
}
