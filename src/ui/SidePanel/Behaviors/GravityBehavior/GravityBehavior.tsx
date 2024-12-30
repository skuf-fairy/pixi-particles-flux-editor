import { Flex } from "antd";
import React from "react";
import { useGravityBehaviorStore } from "src/hooks/useGravityBehaviorStore";
import { BehaviorType } from "src/services/types";
import { BehaviorTypeSelect } from "src/ui/components/BehaviorTypeSelect/BehaviorTypeSelect";
import { FieldsGrid } from "src/ui/components/FieldsGrid/FieldsGrid";
import { NumberOption } from "src/ui/components/NumberOption/NumberOption";
import { ScalarStaticBehaviorOption } from "src/ui/components/ScalarStaticBehavior/ScalarStaticBehaviorOption";
import { BehaviorName } from "../../BehaviorName/BehaviorName";
import { ItemContainer } from "../../ItemContainer/ItemContainer";

export function GravityBehavior() {
  const store = useGravityBehaviorStore();
  const state = store.getState();
  const configType = state.activeType;

  const rangeConfig = store.getState().rangeConfig;

  return (
    <ItemContainer isDisabled={!store.isEnabled()}>
      <Flex justify="space-between">
        <BehaviorName
          name="Gravity"
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
          type={state.activeType}
          onChange={(type) => {
            if (type === BehaviorType.ScalarStatic || type === BehaviorType.ScalarDynamic) {
              store.setActiveConfigType(type);
            }
          }}
        />
      </Flex>

      {configType === BehaviorType.ScalarStatic && (
        <ScalarStaticBehaviorOption config={state.staticConfig} onChange={(v) => store.setStaticConfig(v)} />
      )}

      {state.activeType === BehaviorType.ScalarDynamic && (
        <FieldsGrid columns={2}>
          <NumberOption
            value={rangeConfig.min}
            text="Min"
            onChange={(v) => store.setRangeConfig({ ...rangeConfig, min: v })}
          />
          <NumberOption
            value={rangeConfig.max}
            text="Max"
            onChange={(v) => store.setRangeConfig({ ...rangeConfig, max: v })}
          />
        </FieldsGrid>
      )}
    </ItemContainer>
  );
}
