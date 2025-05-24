import React from 'react';

import {useDirectionBehaviorStore} from 'src/hooks/connectors';
import {BooleanValue} from 'src/ui/components/BooleanValue/BooleanValue';
import {FieldsGrid} from 'src/ui/components/FieldsGrid/FieldsGrid';
import {NumberOption} from 'src/ui/components/NumberOption/NumberOption';

import s from './RangeConfigDirection.module.css';

export function RangeConfigDirection() {
  const store = useDirectionBehaviorStore();
  const state = store.getState();
  const {minAngle, maxAngle} = state.rangeConfig;

  const startAngle = minAngle;
  const endAngle = maxAngle;
  const delta = endAngle - startAngle;

  return (
    <FieldsGrid>
      <NumberOption
        value={minAngle}
        text="Min angle"
        onBlur={(v) => store.setRangeConfig({...state.rangeConfig, minAngle: v})}
      />
      <NumberOption
        value={maxAngle}
        text="Max angle"
        onBlur={(v) => store.setRangeConfig({...state.rangeConfig, maxAngle: v})}
      />

      <BooleanValue
        checked={store.isRotateByDirection()}
        label="Rotate by direction"
        onChange={() => store.toggleFollowDirection()}
      />

      <div
        style={{
          background: getCircleSegment(startAngle, delta),
        }}
        className={s.segment}
      />
    </FieldsGrid>
  );
}

function getCircleSegment(startAngle: number, delta: number): string {
  return `conic-gradient(from ${startAngle + 90}deg, var(--primary-text-color) ${delta}deg, transparent ${delta}deg)`;
}
