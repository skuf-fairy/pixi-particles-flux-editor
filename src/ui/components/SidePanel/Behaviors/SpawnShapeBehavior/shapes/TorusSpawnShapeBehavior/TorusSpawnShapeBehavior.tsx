import React from 'react';

import {SpawnTorusShape} from 'particle-flux';
import {FieldsGrid} from 'src/ui/components/FieldsGrid/FieldsGrid';
import {NumberOption} from 'src/ui/components/NumberOption/NumberOption';

import {SpawnShapeName} from '../../SpawnShapeName';

interface Props {
  config: SpawnTorusShape;
  onChange(v: SpawnTorusShape): void;
  spawnShapeIndex: number;
}

export function TorusSpawnShapeBehavior({config, onChange, spawnShapeIndex}: Props) {
  return (
    <div>
      <SpawnShapeName title="Torus" spawnShapeIndex={spawnShapeIndex} />

      <FieldsGrid>
        <NumberOption value={config.x} text="x" onBlur={(v) => onChange({...config, x: v})} />
        <NumberOption value={config.y} text="y" onBlur={(v) => onChange({...config, y: v})} />
        <NumberOption
          value={config.innerRadius || 0}
          text="Inner radius"
          onBlur={(v) => onChange({...config, innerRadius: v})}
        />
        <NumberOption
          value={config.outerRadius}
          text="Outer radius"
          onBlur={(v) => onChange({...config, outerRadius: v})}
        />
        <NumberOption
          value={config.startAngle || 0}
          text="Start angle"
          onBlur={(v) => onChange({...config, startAngle: v})}
        />
        <NumberOption
          value={config.endAngle || 360}
          text="Start angle"
          onBlur={(v) => onChange({...config, endAngle: v})}
        />
      </FieldsGrid>
    </div>
  );
}
