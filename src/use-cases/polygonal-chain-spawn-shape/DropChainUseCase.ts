import { injected } from "brandi";
import { SpawnShapeType, isSinglePolygonalChain } from "particle-flux";
import { DI_TOKENS } from "src/di/di.tokens";
import { SpawnShapeBehaviorStore } from "src/stores/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore";

export class DropChainUseCase {
  constructor(private readonly spawnShapeBehaviorStore: SpawnShapeBehaviorStore) {}

  public dropChain(chainIndex: number): void {
    const currentChain = this.spawnShapeBehaviorStore.getState().polygonalShape.chain;

    if (isSinglePolygonalChain(currentChain)) {
      return;
    } else {
      this.spawnShapeBehaviorStore.setPolygonalShapeConfig({
        type: SpawnShapeType.Polygon,
        chain: currentChain.filter((_, index) => index !== chainIndex),
      });
    }
  }
}

injected(DropChainUseCase, DI_TOKENS.spawnShapeBehaviorStore);
