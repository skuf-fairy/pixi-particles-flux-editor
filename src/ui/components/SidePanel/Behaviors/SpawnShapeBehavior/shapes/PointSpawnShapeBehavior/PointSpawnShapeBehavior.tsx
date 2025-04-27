import { SpawnPointShape } from "particle-flux";
import React from "react";
import { FieldsGrid } from "src/ui/components/FieldsGrid/FieldsGrid";
import { NumberOption } from "src/ui/components/NumberOption/NumberOption";
import { SpawnShapeName } from "../../SpawnShapeName";

interface Props {
  config: SpawnPointShape;
  onChange(v: SpawnPointShape): void;
  spawnShapeIndex: number;
}

export function PointSpawnShapeBehavior({ config, onChange, spawnShapeIndex }: Props) {
  return (
    <div>
      <SpawnShapeName title="Point" spawnShapeIndex={spawnShapeIndex} />
      <FieldsGrid>
        <NumberOption value={config.x} text="x" onBlur={(v) => onChange({ ...config, x: v })} />
        <NumberOption value={config.y} text="y" onBlur={(v) => onChange({ ...config, y: v })} />
      </FieldsGrid>
    </div>
  );
}
