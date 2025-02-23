import React from "react";
import { useGravityBehaviorStore } from "src/hooks/useGravityBehaviorStore";
import { BehaviorType } from "src/services/types";
import { BehaviorTypeSelect } from "src/ui/components/BehaviorTypeSelect/BehaviorTypeSelect";
import { ScalarDynamicBehaviorOption } from "src/ui/components/ScalarDynamicBehaviorOption/ScalarDynamicBehaviorOption";
import { ScalarStaticBehaviorOption } from "src/ui/components/ScalarStaticBehavior/ScalarStaticBehaviorOption";
import { BehaviorName } from "../../BehaviorName/BehaviorName";
import { ItemContainer } from "../../ItemContainer/ItemContainer";

export function GravityBehavior() {
  const store = useGravityBehaviorStore();
  const state = store.getState();
  const configType = state.activeType;

  return (
    <ItemContainer>
      <div>
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
        <BehaviorTypeSelect
          type={state.activeType}
          availableTypes={state.availableTypes}
          onChange={(type) => {
            if (type === BehaviorType.ScalarStatic || type === BehaviorType.ScalarDynamic) {
              store.setActiveConfigType(type);
            }
          }}
        />
      </div>

      {configType === BehaviorType.ScalarStatic && (
        <ScalarStaticBehaviorOption
          config={state.scalarStaticBehaviorConfig}
          onChange={(v) => store.setStaticConfig(v)}
        />
      )}

      {state.activeType === BehaviorType.ScalarDynamic && (
        <ScalarDynamicBehaviorOption
          config={state.scalarDynamicBehaviorConfig}
          onChange={(v) => store.setDynamicConfig(v)}
        />
      )}
    </ItemContainer>
  );
}
