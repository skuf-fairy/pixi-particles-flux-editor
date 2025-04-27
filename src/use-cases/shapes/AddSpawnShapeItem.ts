import { injected } from "brandi";
import { SpawnShapeType } from "particle-flux";
import { DI_TOKENS } from "src/di/di.tokens";
import { SpawnShapeBehaviorStore } from "src/stores/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore";

export class AddSpawnShapeItem {
  constructor(private readonly spawnShapeStore: SpawnShapeBehaviorStore) {}

  public add(spawnShapeType: SpawnShapeType): void {
    if (spawnShapeType === SpawnShapeType.Point) {
      this.spawnShapeStore.setShapeList([
        ...this.spawnShapeStore.getShapeList(),
        {
          type: SpawnShapeType.Point,
          x: 0,
          y: 0,
        },
      ]);
    } else if (spawnShapeType === SpawnShapeType.Rectangle) {
      this.spawnShapeStore.setShapeList([
        ...this.spawnShapeStore.getShapeList(),
        {
          type: SpawnShapeType.Rectangle,
          x: 0,
          y: 0,
          width: 0,
          height: 0,
        },
      ]);
    } else if (spawnShapeType === SpawnShapeType.Torus) {
      this.spawnShapeStore.setShapeList([
        ...this.spawnShapeStore.getShapeList(),
        {
          type: SpawnShapeType.Torus,
          x: 0,
          y: 0,
          innerRadius: 0,
          outerRadius: 0,
          startAngle: 0,
          endAngle: 360,
        },
      ]);
    } else if (spawnShapeType === SpawnShapeType.Chain) {
      this.spawnShapeStore.setShapeList([
        ...this.spawnShapeStore.getShapeList(),
        {
          type: SpawnShapeType.Chain,
          chain: [
            {
              x: 0,
              y: 0,
            },
            {
              x: 0,
              y: 0,
            },
          ],
        },
      ]);
    }
  }
}

injected(AddSpawnShapeItem, DI_TOKENS.spawnShapeBehaviorStore);
