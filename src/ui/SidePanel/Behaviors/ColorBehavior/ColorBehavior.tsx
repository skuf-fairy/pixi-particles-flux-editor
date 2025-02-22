import { ColorPicker, Flex } from "antd";
import React from "react";
import { useColorBehaviorStore } from "src/hooks/useColorBehaviorStore";
import { BehaviorTypeSelect } from "src/ui/components/BehaviorTypeSelect/BehaviorTypeSelect";
import { BehaviorName } from "../../BehaviorName/BehaviorName";
import { ItemContainer } from "../../ItemContainer/ItemContainer";
import { ColorScriptBehavior } from "./ColorScriptBehavior";

export function ColorBehavior() {
  const store = useColorBehaviorStore();

  return (
    <ItemContainer>
      <Flex justify="space-between">
        <BehaviorName
          name="Color"
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
          type={store.getState().activeType}
          availableTypes={store.getState().availableTypes}
          onChange={(type) => {
            store.setActiveType(type);
          }}
        />
      </Flex>

      {store.isStaticConfigActive() && (
        <ColorPicker
          value={store.getState().staticConfig.value}
          size="large"
          onChange={(v) => {
            store.setStaticBehaviorConfig({ value: v.toHexString() });
          }}
        />
      )}

      {store.isScriptConfigActive() && <ColorScriptBehavior />}
    </ItemContainer>
  );
}
