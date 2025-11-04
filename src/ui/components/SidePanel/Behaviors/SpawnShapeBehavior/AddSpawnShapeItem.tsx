import {useAddSpawnShapeItemUseCaseToken} from 'src/di/di.hooks';

import React from 'react';

import {SPAWN_SHAPE_TYPES_LIST, SpawnShapeType} from 'particle-flux';
import {DropDown, DropDownSize} from 'src/ui/kit/DropDown/DropDown';

import s from './AddSpawnShapeItem.module.css';

export function AddSpawnShapeItem() {
  const addSpawnShapeItemUseCase = useAddSpawnShapeItemUseCaseToken();

  return (
    <DropDown
      value={{value: 'Add shape', key: 'default'}}
      options={SPAWN_SHAPE_TYPES_LIST.map((t) => ({value: t, key: t}))}
      onChange={(v) => addSpawnShapeItemUseCase.add(v.key as SpawnShapeType)}
      size={DropDownSize.Small}
      className={s.root}
    />
  );
}
