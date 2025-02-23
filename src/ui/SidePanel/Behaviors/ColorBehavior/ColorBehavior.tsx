import React from "react";
import { useColorBehaviorStore } from "src/hooks/useColorBehaviorStore";
import { BehaviorTypeSelect } from "src/ui/components/BehaviorTypeSelect/BehaviorTypeSelect";
import { ColorPicker } from "src/ui/kit/ColorPicker/ColorPicker";
import { BehaviorName } from "../../BehaviorName/BehaviorName";
import { ItemContainer } from "../../ItemContainer/ItemContainer";
import { ColorScriptBehavior } from "./ColorScriptBehavior";

export function ColorBehavior() {
  const store = useColorBehaviorStore();

  return (
    <ItemContainer>
      <div>
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
      </div>

      {store.isStaticConfigActive() && (
        <ColorPicker
          color={store.getState().staticConfig.value}
          onChange={(v) => {
            store.setStaticBehaviorConfig({ value: v });
          }}
        />
      )}

      {store.isScriptConfigActive() && <ColorScriptBehavior />}
    </ItemContainer>
  );
}
