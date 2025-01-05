import { EasingName, ScalarStaticBehaviorConfig } from "particle-flux";
import React from "react";
import { EasingOption } from "../EasingOption/EasingOption";
import { FieldsGrid } from "../FieldsGrid/FieldsGrid";
import { MultiplicatorOption } from "../MultiplicatorOption/MultiplicatorOption";
import { NumberOption } from "../NumberOption/NumberOption";

interface Props {
  config: ScalarStaticBehaviorConfig;
  onChange(v: ScalarStaticBehaviorConfig): void;
}

export function ScalarStaticBehaviorOption({ config, onChange }: Props) {
  return (
    <FieldsGrid columns={3}>
      <NumberOption value={config.value} text="Value" onChange={(v) => onChange({ ...config, value: v })} />
      {config.mult && <MultiplicatorOption mult={config.mult} onChange={(v) => onChange({ ...config, mult: v })} />}
      <EasingOption easing={config.easing || EasingName.linear} onChange={(v) => onChange({ ...config, easing: v })} />
    </FieldsGrid>
  );
}
