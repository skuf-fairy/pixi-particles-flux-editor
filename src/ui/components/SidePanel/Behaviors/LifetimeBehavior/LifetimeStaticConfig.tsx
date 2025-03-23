import React from "react";
import { NumberOption } from "src/ui/components/NumberOption/NumberOption";

interface Props {
  value: number;
  onChange(v: number): void;
}

export function LifetimeStaticConfig({ value, onChange }: Props) {
  return <NumberOption value={value} min={0} max={Number.MAX_SAFE_INTEGER} text="Value" onBlur={onChange} />;
}
