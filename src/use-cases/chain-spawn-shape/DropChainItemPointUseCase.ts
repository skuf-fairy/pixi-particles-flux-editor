import { injected } from "brandi";
import { SpawnChainShape } from "particle-flux";
import { DI_TOKENS } from "src/di/di.tokens";
import { SpawnShapeBehaviorStore } from "src/stores/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore";

export class DropChainItemPointUseCase {
  constructor(private readonly spawnShapeBehaviorStore: SpawnShapeBehaviorStore) {}

  public dropChainItemPoint(shapeIndex: number, pointIndex: number): void {
    const shapeList = this.spawnShapeBehaviorStore.getShapeList();
    const currentChain = shapeList[shapeIndex] as SpawnChainShape;

    currentChain.chain = currentChain.chain.filter((_, key) => key !== pointIndex);

    this.spawnShapeBehaviorStore.setShapeList([...shapeList]);
  }
}

injected(DropChainItemPointUseCase, DI_TOKENS.spawnShapeBehaviorStore);
