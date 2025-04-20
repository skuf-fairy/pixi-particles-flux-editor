import { ScalarDynamicBehaviorConfig, ScalarStaticBehaviorConfig, ScriptTimeConfig } from "particle-flux";
import React from "react";
import { useScaleBehaviorStore } from "src/hooks/connectors";
import { BehaviorTypeSelect } from "src/ui/components/BehaviorTypeSelect/BehaviorTypeSelect";
import { NumberScriptBehaviorOption } from "src/ui/components/NumberScriptBehaviorOption/NumberScriptBehaviorOption";
import { ScalarDynamicBehaviorOption } from "src/ui/components/ScalarDynamicBehaviorOption/ScalarDynamicBehaviorOption";
import { ScalarStaticBehaviorOption } from "src/ui/components/ScalarStaticBehavior/ScalarStaticBehaviorOption";
import { VectorBehaviorOption } from "src/ui/components/VectorBehaviorOption/VectorBehaviorOption";
import { BehaviorHeader } from "../../BehaviorHeader/BehaviorHeader";
import { BehaviorName } from "../../BehaviorName/BehaviorName";
import { ItemContainer } from "../../ItemContainer/ItemContainer";
import { BehaviorEnabled } from "../BehaviorEnabled/BehaviorEnabled";

export function ScaleBehavior() {
  const store = useScaleBehaviorStore();

  const state = store.getState();

  return (
    <ItemContainer>
      <BehaviorHeader
        left={<BehaviorName name="Scale" />}
        right={
          <>
            <BehaviorTypeSelect
              type={state.activeType}
              availableTypes={state.availableTypes}
              onChange={(type) => {
                store.setActiveConfigType(type);
              }}
            />
            <BehaviorEnabled
              isEnabled={store.isEnabled()}
              onChange={(isEnabled: boolean) => {
                if (isEnabled) {
                  store.enable();
                } else {
                  store.disable();
                }
              }}
            />
          </>
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
        <NumberScriptBehaviorOption config={state.scriptConfig} onChange={(v) => store.setScriptConfig(v)} />
      )}
      {store.isVectorConfigActive() && (
        <VectorBehaviorOption config={state.vectorConfig} onChange={(v) => store.setVectorConfig(v)} />
      )}
    </ItemContainer>
  );
}
