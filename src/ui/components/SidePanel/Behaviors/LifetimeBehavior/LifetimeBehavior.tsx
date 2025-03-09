import React from "react";
import { useLifetimeBehaviorStore } from "src/hooks/connectors";
import { FieldsGrid } from "src/ui/components/FieldsGrid/FieldsGrid";
import { NumberOption } from "src/ui/components/NumberOption/NumberOption";
import { BehaviorHeader } from "../../BehaviorHeader/BehaviorHeader";
import { BehaviorName } from "../../BehaviorName/BehaviorName";
import { ItemContainer } from "../../ItemContainer/ItemContainer";

export function LifetimeBehavior() {
  const store = useLifetimeBehaviorStore();
  const config = store.getState();
  const { min, max } = config.rangeConfig;

  return (
    <ItemContainer>
      <BehaviorHeader left={<BehaviorName name="Life time" />} right={null} />

      <FieldsGrid>
        <NumberOption value={min} text="Min" onBlur={(v) => store.setRangeConfig({ min: v, max })} />
        <NumberOption value={max} text="Max" onBlur={(v) => store.setRangeConfig({ min, max: v })} />
      </FieldsGrid>
    </ItemContainer>
  );
}
