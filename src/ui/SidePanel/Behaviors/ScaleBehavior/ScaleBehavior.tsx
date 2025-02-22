import { Space } from "antd";
import React from "react";
import { useScaleBehaviorStore } from "src/hooks/useScaleBehaviorStore";
import { BehaviorType } from "src/services/types";
import { ScalarDynamicBehaviorOption } from "src/ui/components/ScalarDynamicBehaviorOption/ScalarDynamicBehaviorOption";
import { ScalarStaticBehaviorOption } from "src/ui/components/ScalarStaticBehavior/ScalarStaticBehaviorOption";
import { BehaviorName } from "../../BehaviorName/BehaviorName";
import { ItemContainer } from "../../ItemContainer/ItemContainer";
import { ScriptBehaviorOption } from "../../ScriptBehaviorOption/ScriptBehaviorOption";

export function ScaleBehavior() {
  const store = useScaleBehaviorStore();

  const state = store.getState();

  return (
    <ItemContainer>
      <Space direction="vertical">
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
      </Space>
    </ItemContainer>
  );
}
