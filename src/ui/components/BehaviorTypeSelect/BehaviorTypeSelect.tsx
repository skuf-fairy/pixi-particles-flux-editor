import { Select } from "antd";
import React from "react";
import { BehaviorType } from "src/services/types";

interface Props {
  type: BehaviorType;
  availableTypes: BehaviorType[];
  onChange(type: BehaviorType): void;
}

export function BehaviorTypeSelect({ type, onChange }: Props) {
  return (
    <Select
      defaultValue={type}
      value={type}
      options={Object.values(BehaviorType).map((t) => ({ value: t, label: t }))}
      onChange={(v) => onChange(v)}
    />
  );
}
