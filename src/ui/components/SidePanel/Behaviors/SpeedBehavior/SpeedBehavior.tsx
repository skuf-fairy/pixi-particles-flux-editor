import { ScalarDynamicBehaviorConfig, ScalarStaticBehaviorConfig, TimeScriptConfig } from "particle-flux";
import React from "react";
import { useSpeedBehaviorStore } from "src/hooks/connectors";
import { BehaviorTypeSelect } from "src/ui/components/BehaviorTypeSelect/BehaviorTypeSelect";
import { ScalarDynamicBehaviorOption } from "src/ui/components/ScalarDynamicBehaviorOption/ScalarDynamicBehaviorOption";
import { ScalarStaticBehaviorOption } from "src/ui/components/ScalarStaticBehavior/ScalarStaticBehaviorOption";
import { ScriptBehaviorOption } from "../../../ScriptBehaviorOption/ScriptBehaviorOption";
import { BehaviorHeader } from "../../BehaviorHeader/BehaviorHeader";
import { BehaviorName } from "../../BehaviorName/BehaviorName";
import { ItemContainer } from "../../ItemContainer/ItemContainer";

export function SpeedBehavior() {
  const store = useSpeedBehaviorStore();
  const state = store.getState();

  return (
    <ItemContainer>
      <BehaviorHeader
        left={
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
        }
        right={
          <BehaviorTypeSelect
            type={store.state.activeType}
            availableTypes={state.availableTypes}
            onChange={(t) => store.setActiveConfigType(t)}
          />
        }
      />

      {store.isStaticConfigActive() && (
        <ScalarStaticBehaviorOption
          config={state.staticConfig as ScalarStaticBehaviorConfig}
          onChange={(v) => store.setStaticConfig(v)}
        />
      )}

      {store.isDynamicConfigActive() && (
        <ScalarDynamicBehaviorOption
          config={state.dynamicConfig as ScalarDynamicBehaviorConfig}
          onChange={(v) => store.setDynamicConfig(v)}
        />
      )}

      {store.isScriptConfigActive() && (
        <ScriptBehaviorOption
          script={state.scriptConfig.script as TimeScriptConfig<number>}
          onChange={(v) => store.setScriptConfig({ script: v })}
        />
      )}
    </ItemContainer>
  );
}
