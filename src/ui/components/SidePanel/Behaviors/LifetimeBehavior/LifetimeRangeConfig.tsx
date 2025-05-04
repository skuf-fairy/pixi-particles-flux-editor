import React from 'react';

import {RangeValue} from 'particle-flux';
import {FieldsGrid} from 'src/ui/components/FieldsGrid/FieldsGrid';
import {NumberOption} from 'src/ui/components/NumberOption/NumberOption';

interface Props {
  min: number;
  max: number;
  onChange(v: RangeValue): void;
}

export function LifetimeRangeConfig({min, max, onChange}: Props) {
  return (
    <FieldsGrid>
      <NumberOption
        value={min}
        min={0}
        max={Number.MAX_SAFE_INTEGER}
        text="Min"
        onBlur={(v) => onChange({min: v, max})}
      />
      <NumberOption
        value={max}
        min={0}
        max={Number.MAX_SAFE_INTEGER}
        text="Max"
        onBlur={(v) => onChange({min, max: v})}
      />
    </FieldsGrid>
  );
}
