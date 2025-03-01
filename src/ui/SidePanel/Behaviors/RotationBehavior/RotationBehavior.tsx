import React from "react";
import { useRotationBehaviorStore } from "src/hooks/useRotationBehaviorStore";
import { BehaviorType } from "src/services/types";
import { BehaviorTypeSelect } from "src/ui/components/BehaviorTypeSelect/BehaviorTypeSelect";
import { DeltaBehaviorRotation } from "src/ui/components/DeltaBehaviorOption/DeltaBehaviorOption";
import { ScalarDynamicBehaviorOption } from "src/ui/components/ScalarDynamicBehaviorOption/ScalarDynamicBehaviorOption";
import { ScalarStaticBehaviorOption } from "src/ui/components/ScalarStaticBehavior/ScalarStaticBehaviorOption";
import { BehaviorHeader } from "../../BehaviorHeader/BehaviorHeader";
import { BehaviorName } from "../../BehaviorName/BehaviorName";
import { ItemContainer } from "../../ItemContainer/ItemContainer";

export function RotationBehavior() {
  const store = useRotationBehaviorStore();
  const state = store.getState();
  const configType = state.activeType;

  return (
    <ItemContainer>
      <BehaviorHeader
        left={
          <BehaviorName
            name="Rotation"
            isEnabled={store.isEnabled()}
            onEnabledChange={(isEnabled: boolean) => {
              if (isEnabled) {
                store.enable();
              } else {
                store.disable();
              }
            }}
          />
        }
        right={
          <BehaviorTypeSelect
            type={state.activeType}
            availableTypes={state.availableTypes}
            onChange={(type) => {
              if (type === BehaviorType.Static || type === BehaviorType.Dynamic || type === BehaviorType.Delta) {
                store.setActiveConfigType(type);
              }
            }}
          />
        }
      />

      {configType === BehaviorType.Static && (
        <ScalarStaticBehaviorOption config={state.staticConfig} onChange={(v) => store.setStaticConfig(v)} />
      )}

      {state.activeType === BehaviorType.Dynamic && (
        <ScalarDynamicBehaviorOption config={state.dynamicConfig} onChange={(v) => store.setDynamicConfig(v)} />
      )}

      {state.activeType === BehaviorType.Delta && (
        <DeltaBehaviorRotation config={state.deltaConfig} onChange={(v) => store.setScalarDeltaConfig(v)} />
      )}
    </ItemContainer>
  );
}
