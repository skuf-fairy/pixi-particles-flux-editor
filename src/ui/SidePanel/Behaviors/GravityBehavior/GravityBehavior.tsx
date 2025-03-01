import React from "react";
import { useGravityBehaviorStore } from "src/hooks/useGravityBehaviorStore";
import { BehaviorType } from "src/services/types";
import { BehaviorTypeSelect } from "src/ui/components/BehaviorTypeSelect/BehaviorTypeSelect";
import { ScalarDynamicBehaviorOption } from "src/ui/components/ScalarDynamicBehaviorOption/ScalarDynamicBehaviorOption";
import { ScalarStaticBehaviorOption } from "src/ui/components/ScalarStaticBehavior/ScalarStaticBehaviorOption";
import { BehaviorHeader } from "../../BehaviorHeader/BehaviorHeader";
import { BehaviorName } from "../../BehaviorName/BehaviorName";
import { ItemContainer } from "../../ItemContainer/ItemContainer";

export function GravityBehavior() {
  const store = useGravityBehaviorStore();
  const state = store.getState();
  const configType = state.activeType;

  return (
    <ItemContainer>
      <BehaviorHeader
        left={
          <BehaviorName
            name="Gravity"
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
              if (type === BehaviorType.Static || type === BehaviorType.Dynamic) {
                store.setActiveConfigType(type);
              }
            }}
          />
        }
      />

      {configType === BehaviorType.Static && (
        <ScalarStaticBehaviorOption
          config={state.scalarStaticBehaviorConfig}
          onChange={(v) => store.setStaticConfig(v)}
        />
      )}

      {state.activeType === BehaviorType.Dynamic && (
        <ScalarDynamicBehaviorOption
          config={state.scalarDynamicBehaviorConfig}
          onChange={(v) => store.setDynamicConfig(v)}
        />
      )}
    </ItemContainer>
  );
}
