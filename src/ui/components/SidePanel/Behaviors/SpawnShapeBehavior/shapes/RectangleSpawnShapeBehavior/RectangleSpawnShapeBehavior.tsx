import React from 'react';

import {SpawnRectangleShape} from 'particle-flux';
import {FieldsGrid} from 'src/ui/components/FieldsGrid/FieldsGrid';
import {NumberOption} from 'src/ui/components/NumberOption/NumberOption';

import {SpawnShapeName} from '../../SpawnShapeName';

interface Props {
  config: SpawnRectangleShape;
  onChange(v: SpawnRectangleShape): void;
  spawnShapeIndex: number;
}

export function RectangleSpawnShapeBehavior({config, onChange, spawnShapeIndex}: Props) {
  return (
    <div>
      <SpawnShapeName title="Rectangle" spawnShapeIndex={spawnShapeIndex} />
      <FieldsGrid className="properties">
        <NumberOption value={config.x} text="x" onBlur={(v) => onChange({...config, x: v})} />
        <NumberOption value={config.y} text="y" onBlur={(v) => onChange({...config, y: v})} />
        <NumberOption value={config.width} text="Width" onBlur={(v) => onChange({...config, width: v})} />
        <NumberOption value={config.height} text="Height" onBlur={(v) => onChange({...config, height: v})} />
      </FieldsGrid>
    </div>
  );
}
