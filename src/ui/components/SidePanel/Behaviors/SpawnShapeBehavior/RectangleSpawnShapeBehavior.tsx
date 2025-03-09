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
    <FieldsGrid className="properties">
      <NumberOption value={config.x} text="x" onBlur={(v) => onChange({ ...config, x: v })} />
      <NumberOption value={config.y} text="y" onBlur={(v) => onChange({ ...config, y: v })} />
      <NumberOption value={config.width} text="Width" onBlur={(v) => onChange({ ...config, width: v })} />
      <NumberOption value={config.height} text="Height" onBlur={(v) => onChange({ ...config, height: v })} />
    </FieldsGrid>
  );
}
