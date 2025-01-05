import { EasingName, ScalarDynamicBehaviorConfig } from "particle-flux";
import React from "react";
import { EasingOption } from "../EasingOption/EasingOption";
import { FieldsGrid } from "../FieldsGrid/FieldsGrid";
import { MultiplicatorOption } from "../MultiplicatorOption/MultiplicatorOption";
import { NumberOption } from "../NumberOption/NumberOption";

interface Props {
  config: ScalarDynamicBehaviorConfig;
  onChange(v: ScalarDynamicBehaviorConfig): void;
}

export function ScalarDynamicBehaviorOption({ config, onChange }: Props) {
  return (
    <FieldsGrid columns={4}>
      <NumberOption value={config.start} text="Value start" onChange={(v) => onChange({ ...config, start: v })} />
      <NumberOption value={config.end} text="Value end" onChange={(v) => onChange({ ...config, end: v })} />
      {config.mult && <MultiplicatorOption mult={config.mult} onChange={(v) => onChange({ ...config, mult: v })} />}
      <EasingOption easing={config.easing || EasingName.linear} onChange={(v) => onChange({ ...config, easing: v })} />
    </FieldsGrid>
  );
}
