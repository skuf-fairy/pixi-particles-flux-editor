import React from "react";
import { useLifetimeBehaviorStore } from "src/hooks/connectors";
import { BehaviorType } from "src/stores/types";
import { BehaviorTypeSelect } from "src/ui/components/BehaviorTypeSelect/BehaviorTypeSelect";
import { BehaviorHeader } from "../../BehaviorHeader/BehaviorHeader";
import { BehaviorName } from "../../BehaviorName/BehaviorName";
import { ItemContainer } from "../../ItemContainer/ItemContainer";
import { LifetimeRangeConfig } from "./LifetimeRangeConfig";
import { LifetimeStaticConfig } from "./LifetimeStaticConfig";

export function LifetimeBehavior() {
  const store = useLifetimeBehaviorStore();
  const config = store.getState();
  const { min, max } = config.rangeConfig;

  return (
    <ItemContainer>
      <BehaviorHeader
        left={<BehaviorName name="Life time" />}
        right={
          <BehaviorTypeSelect
            type={config.activeType}
            availableTypes={config.availableTypes}
            onChange={(type) => {
              store.setActiveType(type);
            }}
          />
        }
      />

      {store.getActiveType() === BehaviorType.Dynamic && (
        <LifetimeRangeConfig min={min} max={max} onChange={(v) => store.setRangeConfig(v)} />
      )}

      {store.getActiveType() === BehaviorType.Static && (
        <LifetimeStaticConfig value={config.staticConfig.value} onChange={(v) => store.setStaticConfig({ value: v })} />
      )}
    </ItemContainer>
  );
}
