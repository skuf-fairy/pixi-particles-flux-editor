import { RangeValue } from "particle-flux/lib/types";
import React from "react";
import { NumberOption } from "src/ui/components/NumberOption/NumberOption";
import { FieldsGrid } from "../../FieldsGrid/FieldsGrid";

interface Props {
  interval: RangeValue;
  onChange(v: RangeValue): void;
}

export function IntervalRangeValue({ interval, onChange }: Props) {
  return (
    <FieldsGrid>
      <NumberOption
        value={interval.min}
        min={0}
        max={Number.MAX_SAFE_INTEGER}
        text="Spawn interval min"
        onBlur={(v) => onChange({ min: v, max: interval.max })}
      />
      <NumberOption
        value={interval.max}
        min={0}
        max={Number.MAX_SAFE_INTEGER}
        text="Spawn interval max"
        onBlur={(v) => onChange({ max: v, min: interval.min })}
      />
    </FieldsGrid>
  );
}
