import React from 'react';

import {
  SpawnShape,
  isSpawnPointShape,
  isSpawnPolygonalShape,
  isSpawnRectangleShape,
  isSpawnTorusShape,
} from 'particle-flux';
import {useSpawnShapeBehaviorStore} from 'src/hooks/connectors';
import {BooleanValue} from 'src/ui/components/BooleanValue/BooleanValue';

import {BehaviorHeader} from '../../BehaviorHeader/BehaviorHeader';
import {BehaviorName} from '../../BehaviorName/BehaviorName';
import {ItemContainer} from '../../ItemContainer/ItemContainer';
import {AddSpawnShapeItem} from './AddSpawnShapeItem';
import {PointSpawnShapeBehavior} from './shapes/PointSpawnShapeBehavior/PointSpawnShapeBehavior';
import {PolygonalChain} from './shapes/PolygonalChainSpawnShape/PolygonalChain';
import {RectangleSpawnShapeBehavior} from './shapes/RectangleSpawnShapeBehavior/RectangleSpawnShapeBehavior';
import {TorusSpawnShapeBehavior} from './shapes/TorusSpawnShapeBehavior/TorusSpawnShapeBehavior';

import s from './SpawnShapeBehavior.module.css';

export function SpawnShapeBehavior() {
  const store = useSpawnShapeBehaviorStore();
  const {shapeList, isDisplayShape, isGroupWave} = store.getState();

  const renderShape = (shape: SpawnShape, shapeIndex: number) => {
    if (isSpawnRectangleShape(shape)) {
      return (
        <RectangleSpawnShapeBehavior
          spawnShapeIndex={shapeIndex}
          config={shape}
          onChange={(v) => {
            shapeList[shapeIndex] = v;
            store.setShapeList([...shapeList]);
          }}
        />
      );
    }

    if (isSpawnPointShape(shape)) {
      return (
        <PointSpawnShapeBehavior
          spawnShapeIndex={shapeIndex}
          config={shape}
          onChange={(v) => {
            shapeList[shapeIndex] = v;
            store.setShapeList([...shapeList]);
          }}
        />
      );
    }

    if (isSpawnTorusShape(shape)) {
      return (
        <TorusSpawnShapeBehavior
          spawnShapeIndex={shapeIndex}
          config={shape}
          onChange={(v) => {
            shapeList[shapeIndex] = v;
            store.setShapeList([...shapeList]);
          }}
        />
      );
    }

    if (isSpawnPolygonalShape(shape)) {
      return <PolygonalChain shape={shape} spawnShapeIndex={shapeIndex} />;
    }
  };

  return (
    <ItemContainer>
      <BehaviorHeader left={<BehaviorName name="Spawn Shape" />} right={null} />

      <div className={s.root}>
        {shapeList.map((shape, key) => (
          <div key={key} className={s.item}>
            {renderShape(shape, key)}
          </div>
        ))}
      </div>

      <AddSpawnShapeItem />

      <BooleanValue
        checked={isDisplayShape}
        label="Display shape"
        onChange={(checked) => store.setDisplayShape(checked)}
        className={s.toggle}
      />
      <BooleanValue
        checked={isGroupWave}
        label="Group Wave"
        onChange={(checked) => store.setIsGroupWave(checked)}
        className={s.toggle}
      />
    </ItemContainer>
  );
}
