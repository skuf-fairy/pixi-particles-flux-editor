import { PolygonalChain as PolygonalChainType, isSinglePolygonalChain } from "particle-flux";
import React from "react";
import { useAddChainUseCaseToken } from "src/di/di.hooks";
import { Button, ButtonSize, ButtonStyleType } from "src/ui/kit/Button/Button";
import { Divider } from "src/ui/kit/Divider/Divider";
import { Typography, TypographyColor, TypographyVariant } from "src/ui/kit/Typography/Typography";
import { PolygonalChain } from "./PolygonalChain";
import "./PolygonalChainSpawnShape.style.scss";

interface Props {
  chain: PolygonalChainType;
}

export function PolygonalChainSpawnShape({ chain }: Props) {
  const chainList = isSinglePolygonalChain(chain) ? [chain] : chain;

  const addChainUseCase = useAddChainUseCaseToken();

  return (
    <div className="polygonal-chain-spawn-shape">
      <div className="polygonal-chain-spawn-shape__chain-list">
        {chainList.map((chain, key) => (
          <div key={key} className="polygonal-chain-spawn-shape__chain-list-item">
            <PolygonalChain chainIndex={key} chain={chain} />
          </div>
        ))}
      </div>

      <Divider className="polygonal-chain-spawn-shape__divider" />

      <Button
        styleType={ButtonStyleType.Primary}
        size={ButtonSize.Medium}
        onClick={() => {
          addChainUseCase.addChain([
            { x: 0, y: 0 },
            { x: 0, y: 0 },
          ]);
        }}
      >
        Add chain
      </Button>
    </div>
  );
}
