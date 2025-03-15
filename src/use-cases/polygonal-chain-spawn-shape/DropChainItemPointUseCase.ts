import { injected } from "brandi";
import { Chain, SpawnShapeType, isSinglePolygonalChain } from "particle-flux";
import { DI_TOKENS } from "src/di/di.tokens";
import { SpawnShapeBehaviorStore } from "src/stores/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore";

export class DropChainItemPointUseCase {
  constructor(private readonly spawnShapeBehaviorStore: SpawnShapeBehaviorStore) {}

  public dropChainItemPoint(chainIndex: number, pointIndex: number): void {
    const currentChain = this.spawnShapeBehaviorStore.getState().polygonalShape.chain;

    if (isSinglePolygonalChain(currentChain)) {
      const chain = currentChain.filter((_, key) => key !== pointIndex);

      this.spawnShapeBehaviorStore.setPolygonalShapeConfig({
        type: SpawnShapeType.Polygon,
        chain,
      });
    } else {
      const newChain = currentChain.reduce<Chain[]>((result, chain, key) => {
        if (key === chainIndex) {
          const newChain = chain.filter((_, key) => key !== pointIndex);
          result.push(newChain);
        } else {
          result.push(chain);
        }

        return result;
      }, []);

      this.spawnShapeBehaviorStore.setPolygonalShapeConfig({
        type: SpawnShapeType.Polygon,
        chain: newChain,
      });
    }
  }
}

injected(DropChainItemPointUseCase, DI_TOKENS.spawnShapeBehaviorStore);
