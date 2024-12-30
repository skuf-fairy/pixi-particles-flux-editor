import { SpawnCircleShape } from "particle-flux";
import React from "react";
import { FieldsGrid } from "src/ui/components/FieldsGrid/FieldsGrid";
import { NumberOption } from "src/ui/components/NumberOption/NumberOption";

interface Props {
  config: SpawnCircleShape;
  onChange(v: SpawnCircleShape): void;
}

export function CircleSpawnShapeBehavior({ config, onChange }: Props) {
  return (
    <FieldsGrid columns={3} className="properties">
      <NumberOption value={config.x} text="x" onChange={(v) => onChange({ ...config, x: v })} />
      <NumberOption value={config.y} text="y" onChange={(v) => onChange({ ...config, y: v })} />
      <NumberOption value={config.radius} text="Raduis" onChange={(v) => onChange({ ...config, radius: v })} />
    </FieldsGrid>
  );
}
