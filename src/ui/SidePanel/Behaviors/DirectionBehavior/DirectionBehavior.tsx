import React from "react";
import { useDirectionBehaviorStore } from "src/hooks/useDirectionBehaviorStore";
import { FieldsGrid } from "src/ui/components/FieldsGrid/FieldsGrid";
import { NumberOption } from "src/ui/components/NumberOption/NumberOption";
import { BehaviorName } from "../../BehaviorName/BehaviorName";
import { ItemContainer } from "../../ItemContainer/ItemContainer";

export function DirectionBehavior() {
  const store = useDirectionBehaviorStore();
  const state = store.getState();
  const { minAngle, maxAngle } = state.rangeConfig;

  return (
    <ItemContainer isDisabled={!store.isEnabled()}>
      <BehaviorName
        name="Direction"
        isEnabled={store.isEnabled()}
        onEnabledChange={(isEnabled: boolean) => {
          if (isEnabled) {
            store.enable();
          } else {
            store.disable();
          }
        }}
      />

      <FieldsGrid columns={2}>
        <NumberOption
          value={minAngle}
          text="Min angle"
          onChange={(v) => store.setRangeAngle({ maxAngle: state.rangeConfig.maxAngle, minAngle: v })}
        />
        <NumberOption
          value={maxAngle}
          text="Max angle"
          onChange={(v) => store.setRangeAngle({ minAngle: state.rangeConfig.minAngle, maxAngle: v })}
        />
      </FieldsGrid>
    </ItemContainer>
  );
}
