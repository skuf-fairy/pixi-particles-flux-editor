import { Chain } from "particle-flux";
import React from "react";
import {
  useAddChainItemPointUseCaseToken,
  useChangeChainItemPointUseCaseToken,
  useDropChainItemPointUseCaseToken,
  useDropChainUseCaseToken,
} from "src/di/di.hooks";
import { FieldsGrid } from "src/ui/components/FieldsGrid/FieldsGrid";
import { NumberOption } from "src/ui/components/NumberOption/NumberOption";
import { Button, ButtonSize } from "src/ui/kit/Button/Button";
import { SymbolButton } from "src/ui/kit/SymbolButton/SymbolButton";
import { Typography, TypographyVariant } from "src/ui/kit/Typography/Typography";
import "./PolygonalChain.style.scss";

interface Props {
  chainIndex: number;
  chain: Chain;
}

export function PolygonalChain({ chainIndex, chain }: Props) {
  const addChainItemPointUseCase = useAddChainItemPointUseCaseToken();
  const dropChainItemPointUseCase = useDropChainItemPointUseCaseToken();
  const changeChainItemPointUseCase = useChangeChainItemPointUseCaseToken();
  const dropChainUseCase = useDropChainUseCaseToken();

  return (
    <div className="polygonal-chain">
      <div className="polygonal-chain__header">
        <Typography variant={TypographyVariant.H3} className="polygonal-chain__title">
          Chain {chainIndex + 1}
        </Typography>

        <Button
          size={ButtonSize.Small}
          onClick={() => {
            dropChainUseCase.dropChain(chainIndex);
          }}
        >
          <Typography variant={TypographyVariant.P} className="polygonal-chain-spawn-shape__button-text">
            Drop chain
          </Typography>
        </Button>
      </div>

      {chain.map((point, key) => (
        <FieldsGrid key={key} className="polygonal-chain__item">
          <NumberOption
            value={point.x}
            text="x"
            onBlur={(v) => {
              changeChainItemPointUseCase.setChainItemPoint(chainIndex, key, { x: v, y: point.y });
            }}
          />
          <NumberOption
            value={point.y}
            text="y"
            onBlur={(v) => {
              changeChainItemPointUseCase.setChainItemPoint(chainIndex, key, { x: point.x, y: v });
            }}
          />

          <SymbolButton
            onClick={() => dropChainItemPointUseCase.dropChainItemPoint(chainIndex, key)}
            disabled={key === chain.length - 1 || key === 0}
          >
            -
          </SymbolButton>
        </FieldsGrid>
      ))}

      <SymbolButton
        onClick={() => addChainItemPointUseCase.addChainItemPoint({ ...chain[chain.length - 1] }, chainIndex)}
      >
        +
      </SymbolButton>
    </div>
  );
}
