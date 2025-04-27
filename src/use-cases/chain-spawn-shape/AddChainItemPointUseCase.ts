import { injected } from "brandi";
import { Point2d, SpawnChainShape } from "particle-flux";
import { DI_TOKENS } from "src/di/di.tokens";
import { SpawnShapeBehaviorStore } from "src/stores/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore";

export class AddChainItemPointUseCase {
  constructor(private readonly spawnShapeBehaviorStore: SpawnShapeBehaviorStore) {}

  public addChainItemPoint(shapeIndex: number, point: Point2d): void {
    const shapeList = this.spawnShapeBehaviorStore.getShapeList();
    const currentChain = shapeList[shapeIndex] as SpawnChainShape;

    currentChain.chain.push(point);

    this.spawnShapeBehaviorStore.setShapeList([...shapeList]);
  }
}

injected(AddChainItemPointUseCase, DI_TOKENS.spawnShapeBehaviorStore);
