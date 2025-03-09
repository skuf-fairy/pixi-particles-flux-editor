import { ScalarStaticBehaviorConfig } from "particle-flux";
import React from "react";
import { FieldsGrid } from "../FieldsGrid/FieldsGrid";
import { MultiplierOption } from "../MultiplierOption/MultiplierOption";
import { NumberOption } from "../NumberOption/NumberOption";

interface Props {
  config: ScalarStaticBehaviorConfig;
  onChange(v: ScalarStaticBehaviorConfig): void;
  min?: number;
  max?: number;
}

export function ScalarStaticBehaviorOption({ config, onChange, min, max }: Props) {
  return (
    <FieldsGrid>
      <NumberOption
        value={config.value}
        text="Value"
        min={min}
        max={max}
        onBlur={(v) => onChange({ ...config, value: v })}
      />
      {config.multiplier && (
        <MultiplierOption multiplier={config.multiplier} onChange={(v) => onChange({ ...config, multiplier: v })} />
      )}
    </FieldsGrid>
  );
}
