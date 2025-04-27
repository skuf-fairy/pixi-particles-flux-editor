import { injected } from "brandi";
import { SpawnShapeType } from "particle-flux";
import { DI_TOKENS } from "src/di/di.tokens";
import { SpawnShapeBehaviorStore } from "src/stores/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore";

export class DropSpawnShapeItem {
  constructor(private readonly spawnShapeStore: SpawnShapeBehaviorStore) {}

  public drop(spawnShapeIndex: number): void {
    const shapeList = this.spawnShapeStore.getShapeList();

    if (shapeList.length === 1) {
      this.spawnShapeStore.setShapeList([
        {
          type: SpawnShapeType.Point,
          x: 0,
          y: 0,
        },
      ]);
    } else {
      this.spawnShapeStore.setShapeList(shapeList.filter((_, key) => key !== spawnShapeIndex));
    }
  }
}

injected(DropSpawnShapeItem, DI_TOKENS.spawnShapeBehaviorStore);
