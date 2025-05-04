import React from 'react';

import {useSpeedBehaviorStore} from 'src/hooks/connectors';
import {BehaviorTypeSelect} from 'src/ui/components/BehaviorTypeSelect/BehaviorTypeSelect';
import {ScalarStaticBehaviorOption} from 'src/ui/components/ScalarStaticBehavior/ScalarStaticBehaviorOption';
import {ScalarTransitionBehaviorOption} from 'src/ui/components/ScalarTransitionBehaviorOption/ScalarTransitionBehaviorOption';

import {NumberScriptBehaviorOption} from '../../../NumberScriptBehaviorOption/NumberScriptBehaviorOption';
import {BehaviorHeader} from '../../BehaviorHeader/BehaviorHeader';
import {BehaviorName} from '../../BehaviorName/BehaviorName';
import {ItemContainer} from '../../ItemContainer/ItemContainer';
import {BehaviorEnabled} from '../BehaviorEnabled/BehaviorEnabled';

export function SpeedBehavior() {
  const store = useSpeedBehaviorStore();
  const state = store.getState();

  return (
    <ItemContainer>
      <BehaviorHeader
        left={<BehaviorName name="Speed" />}
        right={
          <>
            <BehaviorTypeSelect
              type={store.state.activeType}
              availableTypes={state.availableBehaviorTypes}
              onChange={(t) => store.setActiveConfigType(t)}
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
        <ScalarStaticBehaviorOption
          config={state.staticConfig}
          min={0}
          max={Number.MAX_SAFE_INTEGER}
          onChange={(v) => store.setStaticConfig(v)}
        />
      )}

      {store.isTransitionConfigActive() && (
        <ScalarTransitionBehaviorOption
          config={state.transitionConfig}
          min={0}
          max={Number.MAX_SAFE_INTEGER}
          onChange={(v) => store.setTransitionConfig(v)}
        />
      )}

      {store.isScriptConfigActive() && (
        <NumberScriptBehaviorOption
          config={state.scriptConfig}
          min={0}
          max={Number.MAX_SAFE_INTEGER}
          onChange={(v) => store.setScriptConfig(v)}
        />
      )}
    </ItemContainer>
  );
}
