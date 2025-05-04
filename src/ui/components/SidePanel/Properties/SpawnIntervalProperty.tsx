import React from 'react';

import {useEmitterConfigStore} from 'src/hooks/connectors';
import {PropertyType} from 'src/stores/types';
import {DropDown, DropDownSize} from 'src/ui/kit/DropDown/DropDown';

import {NumberOption} from '../../NumberOption/NumberOption';
import {BehaviorHeader} from '../BehaviorHeader/BehaviorHeader';
import {BehaviorName} from '../BehaviorName/BehaviorName';
import {ItemContainer} from '../ItemContainer/ItemContainer';
import {IntervalRangeValue} from './IntervalRangeValue';

export function SpawnIntervalProperty() {
  const emitterConfigStore = useEmitterConfigStore();
  const spawnIntervalType = emitterConfigStore.getSpawnIntervalType();

  return (
    <ItemContainer>
      <BehaviorHeader
        left={<BehaviorName name="Spawn Interval" />}
        right={
          <DropDown
            value={{value: spawnIntervalType, key: spawnIntervalType}}
            options={Object.values(PropertyType).map((t) => ({value: t, key: t}))}
            onChange={(v) => emitterConfigStore.setActiveSpawnType(v.value as PropertyType)}
            size={DropDownSize.Small}
          />
        }
      />
      {spawnIntervalType === PropertyType.Static && (
        <NumberOption
          value={emitterConfigStore.getSpawnIntervalStatic()}
          text="Value"
          onBlur={(v) => emitterConfigStore.setSpawnInterval(v)}
        />
      )}
      {spawnIntervalType === PropertyType.Range && (
        <IntervalRangeValue
          interval={emitterConfigStore.getSpawnIntervalRange()}
          onChange={(v) => emitterConfigStore.setSpawnInterval(v)}
        />
      )}
    </ItemContainer>
  );
}
