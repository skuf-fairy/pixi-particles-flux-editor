import React from 'react';

import {ScalarStaticBehaviorConfig, ScalarTransitionBehaviorConfig, ScriptTimeConfig} from 'particle-flux';
import {useScaleBehaviorStore} from 'src/hooks/connectors';
import {BehaviorTypeSelect} from 'src/ui/components/BehaviorTypeSelect/BehaviorTypeSelect';
import {NumberScriptBehaviorOption} from 'src/ui/components/NumberScriptBehaviorOption/NumberScriptBehaviorOption';
import {ScalarStaticBehaviorOption} from 'src/ui/components/ScalarStaticBehavior/ScalarStaticBehaviorOption';
import {ScalarTransitionBehaviorOption} from 'src/ui/components/ScalarTransitionBehaviorOption/ScalarTransitionBehaviorOption';
import {VectorBehaviorOption} from 'src/ui/components/VectorBehaviorOption/VectorBehaviorOption';

import {BehaviorHeader} from '../../BehaviorHeader/BehaviorHeader';
import {BehaviorName} from '../../BehaviorName/BehaviorName';
import {ItemContainer} from '../../ItemContainer/ItemContainer';
import {BehaviorEnabled} from '../BehaviorEnabled/BehaviorEnabled';

export function ScaleBehavior() {
  const store = useScaleBehaviorStore();

  const state = store.getState();

  return (
    <ItemContainer>
      <BehaviorHeader
        left={<BehaviorName name="Scale" />}
        right={
          <>
            <BehaviorTypeSelect
              type={state.activeType}
              availableTypes={state.availableBehaviorTypes}
              onChange={(type) => {
                store.setActiveConfigType(type);
              }}
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
          config={state.staticConfig as ScalarStaticBehaviorConfig}
          min={0}
          max={1}
          onChange={(v) => store.setStaticConfig(v)}
        />
      )}
      {store.isTransitionConfigActive() && (
        <ScalarTransitionBehaviorOption
          config={state.transitionConfig as ScalarTransitionBehaviorConfig}
          onChange={(v) => store.setTransitionConfig(v)}
        />
      )}
      {store.isScriptConfigActive() && (
        <NumberScriptBehaviorOption config={state.scriptConfig} onChange={(v) => store.setScriptConfig(v)} />
      )}
      {store.isVectorConfigActive() && (
        <VectorBehaviorOption config={state.vectorConfig} onChange={(v) => store.setVectorConfig(v)} />
      )}
    </ItemContainer>
  );
}
