import { SpawnTorusShape } from "particle-flux";
import React from "react";
import { FieldsGrid } from "src/ui/components/FieldsGrid/FieldsGrid";
import { NumberOption } from "src/ui/components/NumberOption/NumberOption";

interface Props {
  config: SpawnTorusShape;
  onChange(v: SpawnTorusShape): void;
}

export function CircleSpawnShapeBehavior({ config, onChange }: Props) {
  return (
    <FieldsGrid columns={3} className="properties">
      <NumberOption value={config.x} text="x" onChange={(v) => onChange({ ...config, x: v })} />
      <NumberOption value={config.y} text="y" onChange={(v) => onChange({ ...config, y: v })} />
      <NumberOption
        value={config.innerRadius || 0}
        text="Inner radius"
        onChange={(v) => onChange({ ...config, innerRadius: v })}
      />
      <NumberOption
        value={config.outerRadius}
        text="Outer radius"
        onChange={(v) => onChange({ ...config, innerRadius: v })}
      />
    </FieldsGrid>
  );
}
