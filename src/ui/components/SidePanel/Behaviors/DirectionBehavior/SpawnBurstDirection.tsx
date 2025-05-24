import React from 'react';

import {useDirectionBehaviorStore} from 'src/hooks/connectors';
import {BooleanValue} from 'src/ui/components/BooleanValue/BooleanValue';
import {FieldsGrid} from 'src/ui/components/FieldsGrid/FieldsGrid';
import {NumberOption} from 'src/ui/components/NumberOption/NumberOption';

export function SpawnBurstDirection() {
  const store = useDirectionBehaviorStore();
  const state = store.getState();
  const {startAngle, deltaAngle} = state.spawnBurstConfig;

  return (
    <FieldsGrid>
      <NumberOption
        value={startAngle}
        text="Start angle"
        onBlur={(v) => store.setSpawnBurstConfig({...state.spawnBurstConfig, startAngle: v})}
      />
      <NumberOption
        value={deltaAngle}
        text="Delta angle"
        onBlur={(v) => store.setSpawnBurstConfig({...state.spawnBurstConfig, deltaAngle: v})}
      />

      <BooleanValue
        checked={store.isRotateByDirection()}
        label="Rotate by direction"
        onChange={() => store.toggleFollowDirection()}
      />
    </FieldsGrid>
  );
}
