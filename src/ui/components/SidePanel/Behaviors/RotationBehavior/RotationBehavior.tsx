import React from 'react';

import {useRotationBehaviorStore} from 'src/hooks/connectors';
import {BehaviorType} from 'src/stores/types';
import {BehaviorTypeSelect} from 'src/ui/components/BehaviorTypeSelect/BehaviorTypeSelect';
import {DeltaBehaviorRotation} from 'src/ui/components/DeltaBehaviorOption/DeltaBehaviorOption';
import {ScalarStaticBehaviorOption} from 'src/ui/components/ScalarStaticBehavior/ScalarStaticBehaviorOption';
import {ScalarTransitionBehaviorOption} from 'src/ui/components/ScalarTransitionBehaviorOption/ScalarTransitionBehaviorOption';

import {BehaviorHeader} from '../../BehaviorHeader/BehaviorHeader';
import {BehaviorName} from '../../BehaviorName/BehaviorName';
import {ItemContainer} from '../../ItemContainer/ItemContainer';
import {BehaviorEnabled} from '../BehaviorEnabled/BehaviorEnabled';

export function RotationBehavior() {
  const store = useRotationBehaviorStore();
  const state = store.getState();
  const configType = state.activeType;

  return (
    <ItemContainer>
      <BehaviorHeader
        left={<BehaviorName name="Rotation" />}
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

      {configType === BehaviorType.Static && (
        <ScalarStaticBehaviorOption config={state.staticConfig} onChange={(v) => store.setStaticConfig(v)} />
      )}

      {state.activeType === BehaviorType.Transition && (
        <ScalarTransitionBehaviorOption
          config={state.transitionConfig}
          onChange={(v) => store.setTransitionConfig(v)}
        />
      )}

      {state.activeType === BehaviorType.Delta && (
        <DeltaBehaviorRotation config={state.deltaConfig} onChange={(v) => store.setDeltaConfig(v)} />
      )}
    </ItemContainer>
  );
}
