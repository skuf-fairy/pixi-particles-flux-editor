import React from 'react';

import {useDirectionBehaviorStore} from 'src/hooks/connectors';
import {BooleanValue} from 'src/ui/components/BooleanValue/BooleanValue';
import {FieldsGrid} from 'src/ui/components/FieldsGrid/FieldsGrid';
import {NumberOption} from 'src/ui/components/NumberOption/NumberOption';

export function StaticConfigDirection() {
  const store = useDirectionBehaviorStore();
  const state = store.getState();
  const {angle} = state.staticConfig;

  return (
    <FieldsGrid>
      <NumberOption
        value={angle}
        text="Angle"
        onBlur={(v) => store.setStaticConfig({...state.rangeConfig, angle: v})}
      />

      <BooleanValue
        checked={store.isRotateByDirection()}
        label="Rotate by direction"
        onChange={() => store.toggleFollowDirection()}
      />
    </FieldsGrid>
  );
}
