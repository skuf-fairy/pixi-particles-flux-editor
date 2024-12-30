import { SpawnRectangleShape } from "particle-flux";
import React from "react";
import { FieldsGrid } from "src/ui/components/FieldsGrid/FieldsGrid";
import { NumberOption } from "src/ui/components/NumberOption/NumberOption";

interface Props {
  config: SpawnRectangleShape;
  onChange(v: SpawnRectangleShape): void;
}

export function RectangleSpawnShapeBehavior({ config, onChange }: Props) {
  return (
    <FieldsGrid columns={2} className="properties">
      <NumberOption value={config.x} text="x" onChange={(v) => onChange({ ...config, x: v })} />
      <NumberOption value={config.y} text="y" onChange={(v) => onChange({ ...config, y: v })} />
      <NumberOption value={config.width} text="Width" onChange={(v) => onChange({ ...config, width: v })} />
      <NumberOption value={config.height} text="Height" onChange={(v) => onChange({ ...config, height: v })} />
    </FieldsGrid>
  );
}
