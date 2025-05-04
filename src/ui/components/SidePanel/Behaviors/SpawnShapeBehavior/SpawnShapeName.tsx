import {useDropSpawnShapeItemUseCaseToken} from 'src/di/di.hooks';

import React from 'react';

import {Button, ButtonStyleType} from 'src/ui/kit/Button/Button';
import {Typography, TypographyColor, TypographyVariant} from 'src/ui/kit/Typography/Typography';
import {DeleteIcon} from 'src/ui/kit/icons/DeleteIcon';

import s from './SpawnShapeName.module.css';

interface Props {
  title: string;
  spawnShapeIndex: number;
}

export function SpawnShapeName({title, spawnShapeIndex}: Props) {
  const dropSpawnShapeItemUseCase = useDropSpawnShapeItemUseCaseToken();

  return (
    <div className={s.root}>
      <Typography color={TypographyColor.PrimaryTitle} variant={TypographyVariant.H5} className={s.name}>
        {title}
      </Typography>
      <Button styleType={ButtonStyleType.Common} onClick={() => dropSpawnShapeItemUseCase.drop(spawnShapeIndex)}>
        <DeleteIcon className={s.deleteIcon} />
      </Button>
    </div>
  );
}
