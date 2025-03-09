import React from "react";
import { useSpawnShapeBehaviorStore } from "src/hooks/connectors";
import { Switch } from "src/ui/kit/Switch/Switch";
import { Typography, TypographyVariant } from "src/ui/kit/Typography/Typography";
import { BehaviorHeader } from "../../BehaviorHeader/BehaviorHeader";
import { BehaviorName } from "../../BehaviorName/BehaviorName";
import { ItemContainer } from "../../ItemContainer/ItemContainer";
import { CircleSpawnShapeBehavior } from "./CircleSpawnShapeBehavior";
import { PointSpawnShapeBehavior } from "./PointSpawnShapeBehavior";
import { RectangleSpawnShapeBehavior } from "./RectangleSpawnShapeBehavior";
import "./SpawnShapeBehavior.style.scss";
import { SpawnShapeSelect } from "./SpawnShapeSelect";

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
      </div>

      <div className="display-shape">
        <Typography variant={TypographyVariant.P} className="display-shape__title">
          Display shape
        </Typography>
        <Switch checked={isDisplayShape} onChange={(checked) => store.setDisplayShape(checked)} />
      </div>
    </ItemContainer>
  );
}
