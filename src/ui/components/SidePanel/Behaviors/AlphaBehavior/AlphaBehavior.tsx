import { ScalarDynamicBehaviorConfig, ScalarStaticBehaviorConfig, TimeScriptConfig } from "particle-flux";
import React from "react";
import { useAlphaBehaviorStore } from "src/hooks/connectors";
import { BehaviorType } from "src/stores/types";
import { BehaviorTypeSelect } from "src/ui/components/BehaviorTypeSelect/BehaviorTypeSelect";
import { ScalarDynamicBehaviorOption } from "src/ui/components/ScalarDynamicBehaviorOption/ScalarDynamicBehaviorOption";
import { ScalarStaticBehaviorOption } from "src/ui/components/ScalarStaticBehavior/ScalarStaticBehaviorOption";
import { ScriptBehaviorOption } from "../../../ScriptBehaviorOption/ScriptBehaviorOption";
import { BehaviorHeader } from "../../BehaviorHeader/BehaviorHeader";
import { BehaviorName } from "../../BehaviorName/BehaviorName";
import { ItemContainer } from "../../ItemContainer/ItemContainer";

export function AlphaBehavior() {
  const store = useAlphaBehaviorStore();
  const state = store.getState();

  return (
    <ItemContainer>
      <BehaviorHeader
        left={
          <BehaviorName
            name="Alpha"
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
              store.setActiveConfigType(type);
            }}
          />
        }
      />

      {state.activeType === BehaviorType.Static && (
        <ScalarStaticBehaviorOption
          config={state.staticConfig}
          min={0}
          max={1}
          onChange={(v) => store.setStaticConfig(v)}
        />
      )}

      {state.activeType === BehaviorType.Dynamic && (
        <ScalarDynamicBehaviorOption
          config={state.dynamicConfig}
          min={0}
          max={1}
          onChange={(v) => store.setDynamicConfig(v)}
        />
      )}

      {state.activeType === BehaviorType.Script && (
        <ScriptBehaviorOption
          script={state.scriptConfig.script}
          min={0}
          max={1}
          onChange={(v) => store.setScriptConfig({ script: v })}
        />
      )}
    </ItemContainer>
  );
}
