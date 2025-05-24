import React from 'react';

import {useDirectionBehaviorStore} from 'src/hooks/connectors';

import {BehaviorHeader} from '../../BehaviorHeader/BehaviorHeader';
import {BehaviorName} from '../../BehaviorName/BehaviorName';
import {ItemContainer} from '../../ItemContainer/ItemContainer';

import {RangeConfigDirection} from './RangeConfigDirection';
import {SpawnBurstDirection} from './SpawnBurstDirection';
import {StaticConfigDirection} from './StaticConfigDirection';
import {DropDown, DropDownSize} from 'src/ui/kit/DropDown/DropDown';
import {DirectionConfigType} from 'src/stores/DirectionBehaviorStore/DirectionBehaviorStore.types';

const options: Array<{
  key: DirectionConfigType;
  value: string;
}> = [
  {key: 'static', value: 'Static'},
  {key: 'range', value: 'Range'},
  {key: 'spawnBurst', value: 'Spawn Burst'},
];

export function DirectionBehavior() {
  const store = useDirectionBehaviorStore();
  const type = store.getActiveConfigType();
  console.log(
    type,
    options.find((o) => o.key === type),
  );

  return (
    <ItemContainer>
      <BehaviorHeader
        left={<BehaviorName name="Direction" />}
        right={
          <DropDown
            value={options.find((o) => o.key === type) || options[0]}
            options={options}
            onChange={(v) => store.setConfigActive(v.key as DirectionConfigType)}
            size={DropDownSize.Small}
          />
        }
      />

      {type === 'static' && <StaticConfigDirection />}
      {type === 'range' && <RangeConfigDirection />}
      {type === 'spawnBurst' && <SpawnBurstDirection />}
    </ItemContainer>
  );
}
