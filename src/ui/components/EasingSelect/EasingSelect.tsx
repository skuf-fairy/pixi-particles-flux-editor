import { Select } from "antd";
import { EasingName } from "particle-flux";
import React from "react";

interface Props {
  value: EasingName;
  onChange(easing: EasingName): void;
}

export function EasingeSelect({ value, onChange }: Props) {
  return (
    <Select
      defaultValue={value}
      value={value}
      options={Object.values(EasingName).map((e) => ({ value: e, label: e }))}
      onChange={(v) => onChange(v)}
    />
  );
}
