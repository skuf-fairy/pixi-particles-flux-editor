import {
  useAddChainItemPointUseCaseToken,
  useChangeChainItemPointUseCaseToken,
  useDropChainItemPointUseCaseToken,
} from 'src/di/di.hooks';

import React from 'react';

import {SpawnChainShape} from 'particle-flux';
import {FieldsGrid} from 'src/ui/components/FieldsGrid/FieldsGrid';
import {NumberOption} from 'src/ui/components/NumberOption/NumberOption';
import {SymbolButton} from 'src/ui/kit/SymbolButton/SymbolButton';

import {SpawnShapeName} from '../../SpawnShapeName';

import s from './PolygonalChain.module.css';

interface Props {
  shape: SpawnChainShape;
  spawnShapeIndex: number;
}

export function PolygonalChain({shape, spawnShapeIndex}: Props) {
  const addChainItemPointUseCase = useAddChainItemPointUseCaseToken();
  const dropChainItemPointUseCase = useDropChainItemPointUseCaseToken();
  const changeChainItemPointUseCase = useChangeChainItemPointUseCaseToken();

  return (
    <div>
      <SpawnShapeName title="Chain" spawnShapeIndex={spawnShapeIndex} />

      {shape.chain.map((point, key) => (
        <FieldsGrid key={key} className={s.item}>
          <NumberOption
            value={point.x}
            text="x"
            onBlur={(v) => {
              changeChainItemPointUseCase.setChainItemPoint(spawnShapeIndex, key, {x: v, y: point.y});
            }}
          />
          <NumberOption
            value={point.y}
            text="y"
            onBlur={(v) => {
              changeChainItemPointUseCase.setChainItemPoint(spawnShapeIndex, key, {x: point.x, y: v});
            }}
          />

          <SymbolButton
            onClick={() => dropChainItemPointUseCase.dropChainItemPoint(spawnShapeIndex, key)}
            disabled={key === 0 || key === shape.chain.length - 1}
          >
            -
          </SymbolButton>
        </FieldsGrid>
      ))}

      <SymbolButton onClick={() => addChainItemPointUseCase.addChainItemPoint(spawnShapeIndex, {x: 0, y: 0})}>
        +
      </SymbolButton>
    </div>
  );
}
