import { Flex } from "antd";
import React from "react";
import { useRotationBehaviorStore } from "src/hooks/useRotationBehaviorStore";
import { BehaviorType } from "src/services/types";
import { BehaviorTypeSelect } from "src/ui/components/BehaviorTypeSelect/BehaviorTypeSelect";
import { ScalarDynamicBehaviorOption } from "src/ui/components/ScalarDynamicBehaviorOption/ScalarDynamicBehaviorOption";
import { ScalarStaticBehaviorOption } from "src/ui/components/ScalarStaticBehavior/ScalarStaticBehaviorOption";
import { BehaviorName } from "../../BehaviorName/BehaviorName";
import { ItemContainer } from "../../ItemContainer/ItemContainer";

export function RotationBehavior() {
  const store = useRotationBehaviorStore();
  const state = store.getState();
  const configType = state.activeType;

  return (
    <ItemContainer>
      <Flex justify="space-between">
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
        <BehaviorTypeSelect
          type={state.activeType}
          availableTypes={state.availableTypes}
          onChange={(type) => {
            if (
              type === BehaviorType.ScalarStatic ||
              type === BehaviorType.ScalarDynamic ||
              type === BehaviorType.Delta
            ) {
              store.setActiveConfigType(type);
            }
          }}
        />
      </Flex>

      {configType === BehaviorType.ScalarStatic && (
        <ScalarStaticBehaviorOption config={state.staticConfig} onChange={(v) => store.setStaticConfig(v)} />
      )}

      {state.activeType === BehaviorType.ScalarDynamic && (
        <ScalarDynamicBehaviorOption config={state.dynamicConfig} onChange={(v) => store.setDynamicConfig(v)} />
      )}
    </ItemContainer>
  );
}
