import React from 'react';

import {useLifetimeBehaviorStore} from 'src/hooks/connectors';
import {PropertyType} from 'src/stores/types';
import {DropDown, DropDownSize} from 'src/ui/kit/DropDown/DropDown';

import {BehaviorHeader} from '../../BehaviorHeader/BehaviorHeader';
import {BehaviorName} from '../../BehaviorName/BehaviorName';
import {ItemContainer} from '../../ItemContainer/ItemContainer';
import {LifetimeRangeConfig} from './LifetimeRangeConfig';
import {LifetimeStaticConfig} from './LifetimeStaticConfig';

export function LifetimeBehavior() {
  const store = useLifetimeBehaviorStore();
  const config = store.getState();
  const {min, max} = config.rangeConfig;
  const type = store.getActiveType();

  return (
    <ItemContainer>
      <BehaviorHeader
        left={<BehaviorName name="Life time" />}
        right={
          <DropDown
            value={{value: type, key: type}}
            options={Object.values(PropertyType).map((t) => ({value: t, key: t}))}
            onChange={(v) => store.setActiveType(v.value as PropertyType)}
            size={DropDownSize.Small}
          />
        }
      />

      {store.getActiveType() === PropertyType.Range && (
        <LifetimeRangeConfig min={min} max={max} onChange={(v) => store.setRangeConfig(v)} />
      )}

      {store.getActiveType() === PropertyType.Static && (
        <LifetimeStaticConfig value={config.staticConfig.value} onChange={(v) => store.setStaticConfig({value: v})} />
      )}
    </ItemContainer>
  );
}
