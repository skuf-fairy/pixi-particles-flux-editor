import { EasingName, ScalarDynamicBehaviorConfig } from "particle-flux";
import React from "react";
import { EasingOption } from "../EasingOption/EasingOption";
import { FieldsGrid } from "../FieldsGrid/FieldsGrid";
import { MultiplierOption } from "../MultiplierOption/MultiplierOption";
import { NumberOption } from "../NumberOption/NumberOption";

interface Props {
  config: ScalarDynamicBehaviorConfig;
  onChange(v: ScalarDynamicBehaviorConfig): void;
  min?: number;
  max?: number;
}

export function ScalarDynamicBehaviorOption({ config, onChange, min, max }: Props) {
  return (
    <FieldsGrid>
      <NumberOption
        value={config.start}
        text="Start Value"
        min={min}
        max={max}
        onBlur={(v) => onChange({ ...config, start: v })}
      />
      <NumberOption
        value={config.end}
        text="End Value"
        min={min}
        max={max}
        onBlur={(v) => onChange({ ...config, end: v })}
      />
      {config.multiplier && (
        <MultiplierOption multiplier={config.multiplier} onChange={(v) => onChange({ ...config, multiplier: v })} />
      )}
      <EasingOption easing={config.easing || EasingName.linear} onChange={(v) => onChange({ ...config, easing: v })} />
    </FieldsGrid>
  );
}
