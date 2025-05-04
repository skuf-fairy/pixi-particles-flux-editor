import {ParticleTexture} from 'src/stores/TexturesStore/TexturesStore.types';

import React from 'react';

import {Button, ButtonStyleType} from 'src/ui/kit/Button/Button';
import {Typography, TypographyColor, TypographyVariant} from 'src/ui/kit/Typography/Typography';
import {DeleteIcon} from 'src/ui/kit/icons/DeleteIcon';

import s from './TextureList.module.css';

interface Props {
  textureList: ParticleTexture[];
  onRemove(texture: ParticleTexture): void;
}

export function TextureList({textureList, onRemove}: Props) {
  return (
    <ul className={s.root}>
      {textureList.map((texture) => (
        <li key={texture.name} className={s.item}>
          <img src={texture.url} alt={texture.name} className={s.image} />

          <Typography color={TypographyColor.PrimaryText} variant={TypographyVariant.P} className={s.name}>
            {texture.name}
          </Typography>
          <Button styleType={ButtonStyleType.Common} className={s.delete} onClick={() => onRemove(texture)}>
            <DeleteIcon className={s.deleteIcon} />
          </Button>
        </li>
      ))}
    </ul>
  );
}
