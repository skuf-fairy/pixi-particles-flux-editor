import {ColorBehaviorType} from 'src/stores/ColorBehaviorStore/ColorBehaviorStore.types';

import React from 'react';

import {useColorBehaviorStore} from 'src/hooks/connectors';
import {ColorPicker} from 'src/ui/kit/ColorPicker/ColorPicker';
import {DropDown, DropDownSize} from 'src/ui/kit/DropDown/DropDown';

import {BehaviorHeader} from '../../BehaviorHeader/BehaviorHeader';
import {BehaviorName} from '../../BehaviorName/BehaviorName';
import {ItemContainer} from '../../ItemContainer/ItemContainer';
import {BehaviorEnabled} from '../BehaviorEnabled/BehaviorEnabled';
import {ColorDynamicBehavior} from './ColorDynamicBehavior';
import {ColorScriptBehavior} from './ColorScriptBehavior';

export function ColorBehavior() {
  const store = useColorBehaviorStore();
  const type = store.getActiveType();

  return (
    <ItemContainer>
      <BehaviorHeader
        left={<BehaviorName name="Color" />}
        right={
          <>
            <DropDown
              value={{value: type, key: type}}
              options={Object.values(store.getAvailableTypes()).map((t) => ({value: t, key: t}))}
              onChange={(v) => store.setActiveConfigType(v.value as ColorBehaviorType)}
              size={DropDownSize.Small}
            />

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
          </>
        }
      />

      {store.isStaticConfigActive() && (
        <ColorPicker
          color={store.getState().staticConfig.value as string}
          onChange={(v) => {
            store.setStaticConfig({value: v});
          }}
        />
      )}

      {store.isTransitionConfigActive() && (
        <ColorDynamicBehavior
          config={store.state.transitionConfig}
          onChange={(config) => store.setTransitionConfig(config)}
        />
      )}

      {store.isScriptConfigActive() && <ColorScriptBehavior />}
    </ItemContainer>
  );
}
