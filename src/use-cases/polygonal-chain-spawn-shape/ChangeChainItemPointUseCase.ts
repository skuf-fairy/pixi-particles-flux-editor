import { injected } from "brandi";
import { Chain, Point2d, SpawnShapeType, isSinglePolygonalChain } from "particle-flux";
import { DI_TOKENS } from "src/di/di.tokens";
import { SpawnShapeBehaviorStore } from "src/stores/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore";

export class ChangeChainItemPointUseCase {
  constructor(private readonly spawnShapeBehaviorStore: SpawnShapeBehaviorStore) {}

  public setChainItemPoint(chainIndex: number, pointIndex: number, newValue: Point2d): void {
    const currentChain = this.spawnShapeBehaviorStore.getState().polygonalShape.chain;

    if (isSinglePolygonalChain(currentChain)) {
      this.spawnShapeBehaviorStore.setPolygonalShapeConfig({
        type: SpawnShapeType.Polygon,
        chain: this.getNewChain(currentChain, pointIndex, newValue),
      });
    } else {
      this.spawnShapeBehaviorStore.setPolygonalShapeConfig({
        type: SpawnShapeType.Polygon,
        chain: currentChain.reduce<Chain[]>((result, chain, index) => {
          if (index === chainIndex) {
            result.push(this.getNewChain(chain, pointIndex, newValue));
          } else {
            result.push(chain);
          }

          return result;
        }, []),
      });
    }
  }

  private getNewChain(chain: Chain, pointIndex: number, newValue: Point2d): Chain {
    return chain.reduce<Chain>((result, point, i) => {
      if (i === pointIndex) {
        result.push(newValue);
      } else {
        result.push(point);
      }

      return result;
    }, []);
  }
}

injected(ChangeChainItemPointUseCase, DI_TOKENS.spawnShapeBehaviorStore);
