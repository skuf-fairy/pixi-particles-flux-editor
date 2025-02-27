import React from "react";
import { useSpeedBehaviorStore } from "src/hooks/useSpeedBehaviorStore";
import { BehaviorType } from "src/services/types";
import { BehaviorTypeSelect } from "src/ui/components/BehaviorTypeSelect/BehaviorTypeSelect";
import { ScalarDynamicBehaviorOption } from "src/ui/components/ScalarDynamicBehaviorOption/ScalarDynamicBehaviorOption";
import { ScalarStaticBehaviorOption } from "src/ui/components/ScalarStaticBehavior/ScalarStaticBehaviorOption";
import { BehaviorName } from "../../BehaviorName/BehaviorName";
import { ItemContainer } from "../../ItemContainer/ItemContainer";
import { ScriptBehaviorOption } from "../../ScriptBehaviorOption/ScriptBehaviorOption";

export function SpeedBehavior() {
  const store = useSpeedBehaviorStore();
  const state = store.getState();

  return (
    <ItemContainer>
      <div>
        <BehaviorName
          name="Speed"
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
          type={store.state.activeType}
          availableTypes={state.availableTypes}
          onChange={(t) => store.setActiveType(t)}
        />
      </div>

      {state.activeType === BehaviorType.ScalarStatic && (
        <ScalarStaticBehaviorOption
          config={state.scalarStaticBehaviorConfig}
          onChange={(v) => store.setScalarStaticBehaviorConfig(v)}
        />
      )}

      {state.activeType === BehaviorType.ScalarDynamic && (
        <ScalarDynamicBehaviorOption
          config={state.scalarDynamicBehaviorConfig}
          onChange={(v) => store.setScalarDynamicBehaviorConfig(v)}
        />
      )}

      {state.activeType === BehaviorType.Script && (
        <ScriptBehaviorOption
          script={state.scriptBehaviorConfig.script}
          onChange={(v) => store.setScriptBehaviorConfig({ script: v })}
        />
      )}
    </ItemContainer>
  );
}
