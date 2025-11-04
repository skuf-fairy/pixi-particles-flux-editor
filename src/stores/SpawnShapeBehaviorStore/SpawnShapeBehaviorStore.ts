import {SpawnShapeBehaviorStoreState} from './SpawnShapeBehaviorStore.types';

import {SpawnShape, SpawnShapeBehavior} from 'particle-flux';

import {Store} from '../Store';

export class SpawnShapeBehaviorStore extends Store<SpawnShapeBehaviorStoreState> {
  constructor() {
    super({
      shapeList: [
        {
          type: 'Point',
          x: 0,
          y: 0,
        },
      ],
      isDisplayShape: false,
      isGroupWave: false,
    });
  }

  public setShapeList(shapeList: SpawnShape[]): void {
    this.setValue('shapeList', shapeList);
  }

  public setIsGroupWave(value: boolean): void {
    this.setValue('isGroupWave', value);
  }

  public isGroupWave(): boolean {
    return this.state.isGroupWave;
  }

  public getShapeList(): SpawnShape[] {
    return this.state.shapeList;
  }

  public getSpawnShapeBehavior(): SpawnShapeBehavior {
    const shapes = this.state.shapeList;

    return {
      shape: shapes.length > 1 ? shapes : shapes[0],
      isGroupWave: this.state.isGroupWave,
    };
  }

  public restore(shapeBehavior: SpawnShapeBehavior | undefined): void {
    if (shapeBehavior === undefined) {
      this.setShapeList([
        {
          x: 0,
          y: 0,
          type: 'Point',
        },
      ]);
    } else {
      const shape = shapeBehavior.shape;

      if (Array.isArray(shape)) {
        this.setValue('shapeList', shape);
      } else {
        this.setValue('shapeList', [shape]);
      }

      this.setIsGroupWave(shapeBehavior.isGroupWave || false);
    }
  }

  public setDisplayShape(isDisplayShape: boolean): void {
    this.setValue('isDisplayShape', isDisplayShape);
  }

  public isDisplayShape(): boolean {
    return this.state.isDisplayShape;
  }
}
