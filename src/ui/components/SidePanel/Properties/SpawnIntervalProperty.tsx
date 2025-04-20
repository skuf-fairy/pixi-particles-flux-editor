import { RangeValue, isRangeValue } from "particle-flux";
import React from "react";
import { useEmitterConfigStore } from "src/hooks/connectors";
import { NumberValueType } from "src/stores/EmitterConfigStore";
import { DropDown, DropDownSize } from "src/ui/kit/DropDown/DropDown";
import { NumberOption } from "../../NumberOption/NumberOption";
import { BehaviorHeader } from "../BehaviorHeader/BehaviorHeader";
import { BehaviorName } from "../BehaviorName/BehaviorName";
import { ItemContainer } from "../ItemContainer/ItemContainer";
import { IntervalRangeValue } from "./IntervalRangeValue";

export function SpawnIntervalProperty() {
  const emitterConfigStore = useEmitterConfigStore();
  const spawnIntervalType = emitterConfigStore.getSpawnIntervalType();

  return (
    <ItemContainer>
      <BehaviorHeader
        left={<BehaviorName name="Spawn Interval" />}
        right={
          <DropDown
            value={
              spawnIntervalType === NumberValueType.Static
                ? { value: NumberValueType.Static, key: NumberValueType.Static }
                : { value: NumberValueType.Range, key: NumberValueType.Range }
            }
            options={[
              { value: NumberValueType.Static, key: NumberValueType.Static },
              { value: NumberValueType.Range, key: NumberValueType.Range },
            ]}
            onChange={(v) => emitterConfigStore.setActiveSpawnType(v.value as NumberValueType)}
            size={DropDownSize.Small}
          />
        }
      />
      {spawnIntervalType === NumberValueType.Static && (
        <NumberOption
          value={emitterConfigStore.getSpawnIntervalStatic()}
          text="Value"
          onBlur={(v) => emitterConfigStore.setSpawnInterval(v)}
        />
      )}
      {spawnIntervalType === NumberValueType.Range && (
        <IntervalRangeValue
          interval={emitterConfigStore.getSpawnIntervalRange()}
          onChange={(v) => emitterConfigStore.setSpawnInterval(v)}
        />
      )}
    </ItemContainer>
  );
}
