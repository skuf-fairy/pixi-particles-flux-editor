import { injected } from "brandi";
import { Chain, Point2d, PolygonalChain, SpawnShapeType, isSinglePolygonalChain } from "particle-flux";
import { DI_TOKENS } from "src/di/di.tokens";
import { SpawnShapeBehaviorStore } from "src/stores/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore";

export class AddChainItemPointUseCase {
  constructor(private readonly spawnShapeBehaviorStore: SpawnShapeBehaviorStore) {}

  public addChainItemPoint(chainItemPoint: Point2d, chainIndex: number): void {
    const currentChain = this.spawnShapeBehaviorStore.getState().polygonalShape.chain;

    const chainList = isSinglePolygonalChain(currentChain) ? [currentChain] : currentChain;

    if (chainIndex >= chainList.length) return;

    let chain: PolygonalChain;

    if (isSinglePolygonalChain(currentChain)) {
      chain = [...currentChain.slice(), { ...chainItemPoint }];
    } else {
      chain = currentChain.reduce<Chain[]>((result, chain, i) => {
        if (i === chainIndex) {
          result.push([...chain, chainItemPoint]);
        } else {
          result.push(chain);
        }

        return result;
      }, []);
    }

    this.spawnShapeBehaviorStore.setPolygonalShapeConfig({
      type: SpawnShapeType.Polygon,
      chain,
    });
  }
}

injected(AddChainItemPointUseCase, DI_TOKENS.spawnShapeBehaviorStore);
