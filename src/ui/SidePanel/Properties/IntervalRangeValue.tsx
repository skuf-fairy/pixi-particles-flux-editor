import { RangeValue } from "particle-flux/lib/types";
import React from "react";
import { NumberOption } from "src/ui/components/NumberOption/NumberOption";

interface Props {
  interval: RangeValue;
  onChange(v: RangeValue): void;
}

export function IntervalRangeValue({ interval, onChange }: Props) {
  return (
    <>
      <NumberOption
        value={interval.min}
        text="Spawn interval min"
        onChange={(v) => onChange({ min: v, max: interval.max })}
      />
      <NumberOption
        value={interval.max}
        text="Spawn interval max"
        onChange={(v) => onChange({ max: v, min: interval.min })}
      />
    </>
  );
}
