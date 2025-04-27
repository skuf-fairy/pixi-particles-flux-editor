import { SpawnShapeType } from "particle-flux";
import React from "react";
import { useAddSpawnShapeItemToken } from "src/di/di.hooks";
import { DropDown, DropDownSize } from "src/ui/kit/DropDown/DropDown";
import "./AddSpawnShapeItem.style.scss";

export function AddSpawnShapeItem() {
  const addSpawnShapeItem = useAddSpawnShapeItemToken();

  return (
    <DropDown
      value={{ value: "Add shape", key: "default" }}
      options={Object.values(SpawnShapeType).map((t) => ({ value: t, key: t }))}
      onChange={(v) => addSpawnShapeItem.add(v.key as SpawnShapeType)}
      size={DropDownSize.Small}
      className="add-spawn-shape-item"
    />
  );
}
