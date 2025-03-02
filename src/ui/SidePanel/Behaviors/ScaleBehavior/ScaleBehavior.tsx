import React from "react";
import { useScaleBehaviorStore } from "src/hooks/useScaleBehaviorStore";
import { BehaviorType } from "src/services/types";
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
              store.setActiveType(type);
            }}
          />
        }
      />

      {state.activeType === BehaviorType.Static && (
        <ScalarStaticBehaviorOption
          config={state.scalarStaticBehaviorConfig}
          min={0}
          max={1}
          onChange={(v) => store.setScalarStaticBehaviorConfig(v)}
        />
      )}

      {state.activeType === BehaviorType.Dynamic && (
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

      {state.activeType === BehaviorType.Vector && (
        <VectorBehaviorOption config={state.vectorBehaviorConfig} onChange={(v) => store.setVectorBehaviorConfig(v)} />
      )}
    </ItemContainer>
  );
}
