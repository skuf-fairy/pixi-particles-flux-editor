import {DI_TOKENS} from 'src/di/di.tokens';

import {injected} from 'brandi';
import {SpawnShapeBehaviorStore} from 'src/stores/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore';

export class DropSpawnShapeItemUseCase {
  constructor(private readonly spawnShapeStore: SpawnShapeBehaviorStore) {}

  public drop(spawnShapeIndex: number): void {
    const shapeList = this.spawnShapeStore.getShapeList();

    if (shapeList.length === 1) {
      this.spawnShapeStore.setShapeList([
        {
          type: 'Point',
          x: 0,
          y: 0,
        },
      ]);
    } else {
      this.spawnShapeStore.setShapeList(shapeList.filter((_, key) => key !== spawnShapeIndex));
    }
  }
}

injected(DropSpawnShapeItemUseCase, DI_TOKENS.spawnShapeBehaviorStore);
