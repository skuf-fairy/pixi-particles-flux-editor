import { SpawnShapeType } from "particle-flux";
import React from "react";
import { useSpawnShapeBehaviorStore } from "src/hooks/connectors";
import { DropDown } from "src/ui/kit/DropDown/DropDown";

export function SpawnShapeSelect() {
  const store = useSpawnShapeBehaviorStore();
  const activeShape = store.getState().activeShape;

  return (
    <DropDown
      value={{ value: activeShape, key: activeShape }}
      options={Object.values(SpawnShapeType).map((t) => ({ value: t, key: t }))}
      onChange={(v) => store.setActiveType(v.value as SpawnShapeType)}
    />
  );
}
