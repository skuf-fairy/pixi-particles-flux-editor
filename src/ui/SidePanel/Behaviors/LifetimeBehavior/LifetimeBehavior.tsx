import React from "react";
import { useLifetimeBehaviorStore } from "src/hooks/useLifetimeBehaviorStore";
import { FieldsGrid } from "src/ui/components/FieldsGrid/FieldsGrid";
import { NumberOption } from "src/ui/components/NumberOption/NumberOption";
import { BehaviorName } from "../../BehaviorName/BehaviorName";
import { ItemContainer } from "../../ItemContainer/ItemContainer";

export function LifetimeBehavior() {
  const store = useLifetimeBehaviorStore();
  const config = store.getState();
  const { min, max } = config;

  return (
    <ItemContainer>
      <BehaviorName name="Life time" />

      <FieldsGrid columns={2}>
        <NumberOption value={min} text="Min" onChange={(v) => store.setRangeConfig({ ...config, min: v })} />
        <NumberOption value={max} text="Max" onChange={(v) => store.setRangeConfig({ ...config, max: v })} />
      </FieldsGrid>
    </ItemContainer>
  );
}
