import React from "react";
import { useSpawnShapeBehaviorStore } from "src/hooks/connectors";
import { BooleanValue } from "src/ui/components/BooleanValue/BooleanValue";
import { BehaviorHeader } from "../../BehaviorHeader/BehaviorHeader";
import { BehaviorName } from "../../BehaviorName/BehaviorName";
import { ItemContainer } from "../../ItemContainer/ItemContainer";
import "./SpawnShapeBehavior.style.scss";
import { SpawnShapeSelect } from "./SpawnShapeSelect";
import { CircleSpawnShapeBehavior } from "./shapes/CircleSpawnShapeBehavior/CircleSpawnShapeBehavior";
import { PointSpawnShapeBehavior } from "./shapes/PointSpawnShapeBehavior/PointSpawnShapeBehavior";
import { PolygonalChainSpawnShape } from "./shapes/PolygonalChainSpawnShape/PolygonalChainSpawnShape";
import { RectangleSpawnShapeBehavior } from "./shapes/RectangleSpawnShapeBehavior/RectangleSpawnShapeBehavior";

export function SpawnShapeBehavior() {
  const store = useSpawnShapeBehaviorStore();
  const { rectangleShape, circleShape, pointShape, polygonalShape, isDisplayShape } = store.getState();

  return (
    <ItemContainer>
      <BehaviorHeader left={<BehaviorName name="Spawn Shape" />} right={<SpawnShapeSelect />} />

      <div className="spawn-shape-behavior">
        {store.isRectangleShapeActive() && (
          <RectangleSpawnShapeBehavior config={rectangleShape} onChange={(v) => store.setRectangleShapeConfig(v)} />
        )}
        {store.isPointShapeActive() && (
          <PointSpawnShapeBehavior config={pointShape} onChange={(v) => store.setPointShapeConfig(v)} />
        )}
        {store.isTorusShapeActive() && (
          <CircleSpawnShapeBehavior config={circleShape} onChange={(v) => store.setTorusShapeConfig(v)} />
        )}

        {store.isPolygonShapeActive() && <PolygonalChainSpawnShape chain={polygonalShape.chain} />}
      </div>

      <BooleanValue
        checked={isDisplayShape}
        label="Display shape"
        onChange={(checked) => store.setDisplayShape(checked)}
      />
    </ItemContainer>
  );
}
