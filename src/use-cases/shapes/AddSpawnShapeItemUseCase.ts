import {DI_TOKENS} from 'src/di/di.tokens';

import {injected} from 'brandi';
import {SpawnShapeType} from 'particle-flux';
import {SpawnShapeBehaviorStore} from 'src/stores/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore';

export class AddSpawnShapeItemUseCase {
  constructor(private readonly spawnShapeStore: SpawnShapeBehaviorStore) {}

  public add(spawnShapeType: SpawnShapeType): void {
    if (spawnShapeType === 'Point') {
      this.spawnShapeStore.setShapeList([
        ...this.spawnShapeStore.getShapeList(),
        {
          type: 'Point',
          x: 0,
          y: 0,
        },
      ]);
    } else if (spawnShapeType === 'Rectangle') {
      this.spawnShapeStore.setShapeList([
        ...this.spawnShapeStore.getShapeList(),
        {
          type: 'Rectangle',
          x: 0,
          y: 0,
          width: 0,
          height: 0,
        },
      ]);
    } else if (spawnShapeType === 'Torus') {
      this.spawnShapeStore.setShapeList([
        ...this.spawnShapeStore.getShapeList(),
        {
          type: 'Torus',
          x: 0,
          y: 0,
          innerRadius: 0,
          outerRadius: 0,
          startAngle: 0,
          endAngle: 360,
        },
      ]);
    } else if (spawnShapeType === 'Chain') {
      this.spawnShapeStore.setShapeList([
        ...this.spawnShapeStore.getShapeList(),
        {
          type: 'Chain',
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

injected(AddSpawnShapeItemUseCase, DI_TOKENS.spawnShapeBehaviorStore);
