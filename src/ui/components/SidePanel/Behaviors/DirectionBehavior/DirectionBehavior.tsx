import React from "react";
import { useDirectionBehaviorStore } from "src/hooks/connectors";
import { BooleanValue } from "src/ui/components/BooleanValue/BooleanValue";
import { FieldsGrid } from "src/ui/components/FieldsGrid/FieldsGrid";
import { NumberOption } from "src/ui/components/NumberOption/NumberOption";
import { BehaviorHeader } from "../../BehaviorHeader/BehaviorHeader";
import { BehaviorName } from "../../BehaviorName/BehaviorName";
import { ItemContainer } from "../../ItemContainer/ItemContainer";

export function DirectionBehavior() {
  const store = useDirectionBehaviorStore();
  const state = store.getState();
  const { minAngle, maxAngle } = state.rangeConfig;

  return (
    <ItemContainer>
      <BehaviorHeader left={<BehaviorName name="Direction" />} right={null} />

      <FieldsGrid>
        <NumberOption
          value={minAngle}
          text="Min angle"
          onBlur={(v) => store.setRangeConfig({ maxAngle: state.rangeConfig.maxAngle, minAngle: v })}
        />
        <NumberOption
          value={maxAngle}
          text="Max angle"
          onBlur={(v) => store.setRangeConfig({ minAngle: state.rangeConfig.minAngle, maxAngle: v })}
        />

        <BooleanValue
          checked={store.isFollowDirection()}
          label="Rotate by direction"
          onChange={() => store.toggleFollowDirection()}
        />
      </FieldsGrid>
    </ItemContainer>
  );
}
