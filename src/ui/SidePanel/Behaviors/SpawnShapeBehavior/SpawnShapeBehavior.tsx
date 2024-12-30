import { Flex } from "antd";
import React from "react";
import { useSpawnShapeBehaviorStore } from "src/hooks/useSpawnShapeBehaviorStore";
import { BehaviorName } from "../../BehaviorName/BehaviorName";
import { ItemContainer } from "../../ItemContainer/ItemContainer";
import { CircleSpawnShapeBehavior } from "./CircleSpawnShapeBehavior";
import { PointSpawnShapeBehavior } from "./PointSpawnShapeBehavior";
import { RectangleSpawnShapeBehavior } from "./RectangleSpawnShapeBehavior";
import { SpawnShapeSelect } from "./SpawnShapeSelect";

export function SpawnShapeBehavior() {
  const store = useSpawnShapeBehaviorStore();
  const { rectangleShape, circleShape, pointShape, polygonalShape } = store.getState();

  return (
    <ItemContainer>
      <Flex justify="space-between">
        <BehaviorName name="Spawn Shape" />

        <SpawnShapeSelect />
      </Flex>

      {store.isRectangleShapeActive() && (
        <RectangleSpawnShapeBehavior config={rectangleShape} onChange={(v) => store.setRectangleShapeConfig(v)} />
      )}
      {store.isPointShapeActive() && (
        <PointSpawnShapeBehavior config={pointShape} onChange={(v) => store.setPointShapeConfig(v)} />
      )}
      {store.isCircleShapeActive() && (
        <CircleSpawnShapeBehavior config={circleShape} onChange={(v) => store.setCircleShapeConfig(v)} />
      )}
    </ItemContainer>
  );
}
