import { Select } from "antd";
import { SpawnShapeType } from "particle-flux";
import React from "react";
import { useSpawnShapeBehaviorStore } from "src/hooks/useSpawnShapeBehaviorStore";

export function SpawnShapeSelect() {
  const store = useSpawnShapeBehaviorStore();
  const activeShape = store.getState().activeShape;

  return (
    <Select value={activeShape} onChange={(v) => store.setActiveType(v)}>
      <Select.Option value={SpawnShapeType.Point}>{SpawnShapeType.Point}</Select.Option>
      <Select.Option value={SpawnShapeType.Rectangle}>{SpawnShapeType.Rectangle}</Select.Option>
      <Select.Option value={SpawnShapeType.Torus}>{SpawnShapeType.Torus}</Select.Option>
      <Select.Option value={SpawnShapeType.Polygon}>{SpawnShapeType.Polygon}</Select.Option>
    </Select>
  );
}
