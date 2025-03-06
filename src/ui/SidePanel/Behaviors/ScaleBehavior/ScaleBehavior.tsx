import { ScalarDynamicBehaviorConfig, ScalarStaticBehaviorConfig, TimeScriptConfig } from "particle-flux";
import React from "react";
import { useScaleBehaviorStore } from "src/hooks/useScaleBehaviorStore";
import { BehaviorTypeSelect } from "src/ui/components/BehaviorTypeSelect/BehaviorTypeSelect";
import { ScalarDynamicBehaviorOption } from "src/ui/components/ScalarDynamicBehaviorOption/ScalarDynamicBehaviorOption";
import { ScalarStaticBehaviorOption } from "src/ui/components/ScalarStaticBehavior/ScalarStaticBehaviorOption";
import { ScriptBehaviorOption } from "src/ui/components/ScriptBehaviorOption/ScriptBehaviorOption";
import { VectorBehaviorOption } from "src/ui/components/VectorBehaviorOption/VectorBehaviorOption";
import { BehaviorHeader } from "../../BehaviorHeader/BehaviorHeader";
import { BehaviorName } from "../../BehaviorName/BehaviorName";
import { ItemContainer } from "../../ItemContainer/ItemContainer";

export function ScaleBehavior() {
  const store = useScaleBehaviorStore();

  const state = store.getState();

  return (
    <ItemContainer>
      <BehaviorHeader
        left={
          <BehaviorName
            name="Scale"
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

      {store.isStaticConfigActive() && (
        <ScalarStaticBehaviorOption
          config={state.staticConfig as ScalarStaticBehaviorConfig}
          min={0}
          max={1}
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

      {store.isVectorConfigActive() && (
        <VectorBehaviorOption config={state.vectorConfig} onChange={(v) => store.setVectorConfig(v)} />
      )}
    </ItemContainer>
  );
}
