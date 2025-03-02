import { Multiplier, isRangeValue } from "particle-flux";
import React from "react";
import { NumberOption } from "../NumberOption/NumberOption";

interface Props {
  multiplier: Multiplier;
  onChange(mult: Multiplier): void;
}

export function MultiplierOption({ multiplier, onChange }: Props) {
  if (isRangeValue(multiplier)) {
    return (
      <div>
        <NumberOption
          value={multiplier.min}
          text="Multiplier min"
          onBlur={(v) => onChange({ ...multiplier, min: v })}
        />
        <NumberOption
          value={multiplier.max}
          text="Multiplier max"
          onBlur={(v) => onChange({ ...multiplier, max: v })}
        />
      </div>
    );
  }

  return <NumberOption value={multiplier} text="Multiplier" onBlur={(v) => onChange(v)} />;
}
