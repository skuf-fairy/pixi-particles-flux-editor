import { SpawnPointShape } from "particle-flux";
import React from "react";
import { FieldsGrid } from "src/ui/components/FieldsGrid/FieldsGrid";
import { NumberOption } from "src/ui/components/NumberOption/NumberOption";

interface Props {
  config: SpawnPointShape;
  onChange(v: SpawnPointShape): void;
}

export function PointSpawnShapeBehavior({ config, onChange }: Props) {
  return (
    <FieldsGrid columns={2} className="properties">
      <NumberOption value={config.x} text="x" onChange={(v) => onChange({ ...config, x: v })} />
      <NumberOption value={config.y} text="y" onChange={(v) => onChange({ ...config, y: v })} />
    </FieldsGrid>
  );
}
