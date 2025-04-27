import { SpawnShape, SpawnShapeBehavior, SpawnShapeType } from "particle-flux";
import { Store } from "../Store";

export class SpawnShapeBehaviorStore extends Store<{
  shapeList: SpawnShape[];
  isGroupWave: boolean;
  isDisplayShape: boolean;
}> {
  constructor() {
    super({
      shapeList: [
        {
          type: SpawnShapeType.Point,
          x: 0,
          y: 0,
        },
      ],
      isDisplayShape: false,
      isGroupWave: false,
    });
  }

  public setShapeList(shapeList: SpawnShape[]): void {
    this.setValue("shapeList", shapeList);
  }

  public setIsGroupWave(value: boolean): void {
    this.setValue("isGroupWave", value);
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

  public restore(shapeBehavior: SpawnShapeBehavior): void {
    const shape = shapeBehavior.shape;

    if (Array.isArray(shape)) {
      this.setValue("shapeList", shape);
    } else {
      this.setValue("shapeList", [shape]);
    }

    this.setIsGroupWave(shapeBehavior.isGroupWave || false);
  }

  public setDisplayShape(isDisplayShape: boolean): void {
    this.setValue("isDisplayShape", isDisplayShape);
  }

  public isDisplayShape(): boolean {
    return this.state.isDisplayShape;
  }
}
