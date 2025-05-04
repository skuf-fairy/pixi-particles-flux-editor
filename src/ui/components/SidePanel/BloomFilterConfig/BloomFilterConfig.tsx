import React from 'react';

import {useBloomFilterConfigStore} from 'src/hooks/connectors';

import {FieldsGrid} from '../../FieldsGrid/FieldsGrid';
import {NumberOption} from '../../NumberOption/NumberOption';
import {BehaviorHeader} from '../BehaviorHeader/BehaviorHeader';
import {BehaviorName} from '../BehaviorName/BehaviorName';
import {BehaviorEnabled} from '../Behaviors/BehaviorEnabled/BehaviorEnabled';
import {ItemContainer} from '../ItemContainer/ItemContainer';

export function BloomFilterConfig() {
  const store = useBloomFilterConfigStore();
  const options = store.getOptions();

  return (
    <ItemContainer>
      <BehaviorHeader
        left={<BehaviorName name="Bloom Filter" />}
        right={
          <BehaviorEnabled
            isEnabled={store.isEnabled()}
            onChange={(isEnabled: boolean) => {
              if (isEnabled) {
                store.enable();
              } else {
                store.disable();
              }
            }}
          />
        }
      />

      <FieldsGrid>
        {options.threshold && (
          <NumberOption
            value={options.threshold}
            text="Threshold"
            min={0}
            max={1}
            onBlur={(v) => store.setOptions({...options, threshold: v})}
          />
        )}
        {options.blur && (
          <NumberOption value={options.blur} text="Blur" onBlur={(v) => store.setOptions({...options, blur: v})} />
        )}
        {options.bloomScale && (
          <NumberOption
            value={options.bloomScale}
            text="Bloom scale"
            onBlur={(v) => store.setOptions({...options, bloomScale: v})}
          />
        )}
        {options.quality && (
          <NumberOption
            value={options.quality}
            text="Quality"
            onBlur={(v) => store.setOptions({...options, quality: v})}
          />
        )}
      </FieldsGrid>
    </ItemContainer>
  );
}
