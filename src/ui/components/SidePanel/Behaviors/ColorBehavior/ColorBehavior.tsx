import React from "react";
import { useColorBehaviorStore } from "src/hooks/connectors";
import { BehaviorTypeSelect } from "src/ui/components/BehaviorTypeSelect/BehaviorTypeSelect";
import { ColorPicker } from "src/ui/kit/ColorPicker/ColorPicker";
import { BehaviorHeader } from "../../BehaviorHeader/BehaviorHeader";
import { BehaviorName } from "../../BehaviorName/BehaviorName";
import { ItemContainer } from "../../ItemContainer/ItemContainer";
import { ColorScriptBehavior } from "./ColorScriptBehavior";

export function ColorBehavior() {
  const store = useColorBehaviorStore();

  return (
    <ItemContainer>
      <BehaviorHeader
        left={
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
        }
        right={
          <BehaviorTypeSelect
            type={store.getState().activeType}
            availableTypes={store.getState().availableTypes}
            onChange={(type) => {
              store.setActiveConfigType(type);
            }}
          />
        }
      />

      {store.isStaticConfigActive() && (
        <ColorPicker
          color={store.getState().staticConfig.value as string}
          onChange={(v) => {
            store.setStaticConfig({ value: v });
          }}
        />
      )}

      {store.isScriptConfigActive() && <ColorScriptBehavior />}
    </ItemContainer>
  );
}
