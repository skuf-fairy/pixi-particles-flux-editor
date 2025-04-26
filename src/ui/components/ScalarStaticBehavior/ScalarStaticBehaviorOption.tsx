import { ScalarStaticBehaviorConfig } from "particle-flux";
import React from "react";
import { MultiplierOption } from "../MultiplierOption/MultiplierOption";
import { NumberOption } from "../NumberOption/NumberOption";
import "./ScalarStaticBehaviorOption.style.scss";

interface Props {
  config: ScalarStaticBehaviorConfig;
  onChange(v: ScalarStaticBehaviorConfig): void;
  min?: number;
  max?: number;
}

export function ScalarStaticBehaviorOption({ config, onChange, min, max }: Props) {
  return (
    <div className="scalar-static-behavior-config">
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
    </div>
  );
}
