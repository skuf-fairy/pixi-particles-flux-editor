import {useSelectTextureFromCollectionUseCaseToken} from 'src/di/di.hooks';
import {AVAILABLE_TEXTURES} from 'src/stores/TexturesStore/TexturesStore.constants';
import {CollectionTexture} from 'src/stores/TexturesStore/TexturesStore.types';

import React from 'react';

import {Button, ButtonStyleType} from 'src/ui/kit/Button/Button';
import {Modal} from 'src/ui/kit/Modal/Modal';
import {Typography, TypographyColor, TypographyVariant} from 'src/ui/kit/Typography/Typography';

import s from './TexturesGalleryModal.module.css';

interface Props {
  onClose: VoidFunction;
}

export function TexturesGalleryModal({onClose}: Props) {
  const selectTextureFromCollectionUseCase = useSelectTextureFromCollectionUseCaseToken();

  return (
    <Modal onClose={onClose}>
      <div className={s.root}>
        <Typography color={TypographyColor.PrimaryTitle} variant={TypographyVariant.H2} className={s.title}>
          Textures Gallery
        </Typography>

        <ul className={s.list}>
          {AVAILABLE_TEXTURES.map((item) => (
            <li key={item.name}>
              <Button
                styleType={ButtonStyleType.Common}
                className={s.item}
                onClick={() => selectTextureFromCollectionUseCase.select(item.name as CollectionTexture)}
              >
                <img src={item.url} alt={item.name} className={s.image} />
                <Typography color={TypographyColor.PrimaryText} variant={TypographyVariant.P}>
                  {item.name}
                </Typography>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}
