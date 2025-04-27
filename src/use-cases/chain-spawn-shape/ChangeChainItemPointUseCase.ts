import { injected } from "brandi";
import { Point2d, SpawnChainShape } from "particle-flux";
import { DI_TOKENS } from "src/di/di.tokens";
import { SpawnShapeBehaviorStore } from "src/stores/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore";

export class ChangeChainItemPointUseCase {
  constructor(private readonly spawnShapeBehaviorStore: SpawnShapeBehaviorStore) {}

  public setChainItemPoint(shapeIndex: number, chainIndex: number, newValue: Point2d): void {
    const shapeList = this.spawnShapeBehaviorStore.getShapeList();
    const currentChain = shapeList[shapeIndex] as SpawnChainShape;

    currentChain.chain[chainIndex] = newValue;

    this.spawnShapeBehaviorStore.setShapeList([...shapeList]);
  }
}

injected(ChangeChainItemPointUseCase, DI_TOKENS.spawnShapeBehaviorStore);
