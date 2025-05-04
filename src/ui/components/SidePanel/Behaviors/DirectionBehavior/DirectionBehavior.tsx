import React from 'react';

import {useDirectionBehaviorStore} from 'src/hooks/connectors';
import {BooleanValue} from 'src/ui/components/BooleanValue/BooleanValue';
import {FieldsGrid} from 'src/ui/components/FieldsGrid/FieldsGrid';
import {NumberOption} from 'src/ui/components/NumberOption/NumberOption';

import {BehaviorHeader} from '../../BehaviorHeader/BehaviorHeader';
import {BehaviorName} from '../../BehaviorName/BehaviorName';
import {ItemContainer} from '../../ItemContainer/ItemContainer';

import s from './DirectionBehavior.module.css';

export function DirectionBehavior() {
  const store = useDirectionBehaviorStore();
  const state = store.getState();
  const {minAngle, maxAngle} = state.rangeConfig;

  const startAngle = minAngle;
  const endAngle = maxAngle;
  const delta = endAngle - startAngle;

  return (
    <ItemContainer>
      <BehaviorHeader left={<BehaviorName name="Direction" />} right={null} />

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
    </ItemContainer>
  );
}

function getCircleSegment(startAngle: number, delta: number): string {
  return `conic-gradient(from ${startAngle + 90}deg, var(--primary-text-color) ${delta}deg, transparent ${delta}deg)`;
}
