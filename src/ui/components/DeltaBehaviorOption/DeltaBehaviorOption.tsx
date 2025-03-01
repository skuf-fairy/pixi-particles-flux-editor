import { DeltaBehaviorConfig } from "particle-flux";
import React from "react";
import { FieldsGrid } from "../FieldsGrid/FieldsGrid";
import { MultiplicatorOption } from "../MultiplicatorOption/MultiplicatorOption";
import { NumberOption } from "../NumberOption/NumberOption";

interface Props {
  config: DeltaBehaviorConfig;
  onChange(v: DeltaBehaviorConfig): void;
}

export function DeltaBehaviorRotation({ config, onChange }: Props) {
  return (
    <FieldsGrid columns={3}>
      <NumberOption value={config.value} text="Value" onBlur={(v) => onChange({ ...config, value: v })} />
      <NumberOption value={config.value} text="Delta" onBlur={(v) => onChange({ ...config, delta: v })} />
      {config.mult && <MultiplicatorOption mult={config.mult} onChange={(v) => onChange({ ...config, mult: v })} />}
    </FieldsGrid>
  );
}
