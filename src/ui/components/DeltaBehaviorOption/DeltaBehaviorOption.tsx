import { DeltaBehaviorConfig } from "particle-flux";
import React from "react";
import { FieldsGrid } from "../FieldsGrid/FieldsGrid";
import { MultiplierOption } from "../MultiplierOption/MultiplierOption";
import { NumberOption } from "../NumberOption/NumberOption";

interface Props {
  config: DeltaBehaviorConfig;
  onChange(v: DeltaBehaviorConfig): void;
}

export function DeltaBehaviorRotation({ config, onChange }: Props) {
  return (
    <FieldsGrid>
      <NumberOption value={config.value} text="Value" onBlur={(v) => onChange({ ...config, value: v })} />
      <NumberOption value={config.value} text="Delta" onBlur={(v) => onChange({ ...config, delta: v })} />
      {config.multiplier && (
        <MultiplierOption multiplier={config.multiplier} onChange={(v) => onChange({ ...config, multiplier: v })} />
      )}
    </FieldsGrid>
  );
}
