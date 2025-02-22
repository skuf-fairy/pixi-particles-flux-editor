import { EasingName } from "particle-flux";
import React from "react";
import { DropDown } from "src/ui/kit/DropDown/DropDown";

interface Props {
  value: EasingName;
  onChange(easing: EasingName): void;
}

export function EasingSelect({ value, onChange }: Props) {
  return (
    <DropDown
      value={{ key: value, value }}
      options={Object.values(EasingName).map((e) => ({ value: e, key: e }))}
      onChange={(v) => onChange(v.value as EasingName)}
    />
  );
}
