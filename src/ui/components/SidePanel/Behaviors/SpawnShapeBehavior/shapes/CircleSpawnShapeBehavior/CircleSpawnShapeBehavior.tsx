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
    <FieldsGrid>
      <NumberOption value={config.x} text="x" onBlur={(v) => onChange({ ...config, x: v })} />
      <NumberOption value={config.y} text="y" onBlur={(v) => onChange({ ...config, y: v })} />
      <NumberOption
        value={config.innerRadius || 0}
        text="Inner radius"
        onBlur={(v) => onChange({ ...config, innerRadius: v })}
      />
      <NumberOption
        value={config.outerRadius}
        text="Outer radius"
        onBlur={(v) => onChange({ ...config, innerRadius: v })}
      />
    </FieldsGrid>
  );
}
