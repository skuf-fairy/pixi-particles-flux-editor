import { injected } from "brandi";
import { Chain, SpawnShapeType, isSinglePolygonalChain } from "particle-flux";
import { DI_TOKENS } from "src/di/di.tokens";
import { SpawnShapeBehaviorStore } from "src/stores/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore";

export class AddChainUseCase {
  constructor(private readonly spawnShapeBehaviorStore: SpawnShapeBehaviorStore) {}

  public addChain(newChain: Chain): void {
    const currentChain = this.spawnShapeBehaviorStore.getState().polygonalShape.chain;

    if (isSinglePolygonalChain(currentChain)) {
      this.spawnShapeBehaviorStore.setPolygonalShapeConfig({
        type: SpawnShapeType.Polygon,
        chain: [currentChain, newChain],
      });
    } else {
      this.spawnShapeBehaviorStore.setPolygonalShapeConfig({
        type: SpawnShapeType.Polygon,
        chain: [...currentChain, newChain],
      });
    }
  }
}

injected(AddChainUseCase, DI_TOKENS.spawnShapeBehaviorStore);
