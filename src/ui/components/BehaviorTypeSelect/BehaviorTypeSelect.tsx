import React from "react";
import { BehaviorType } from "src/stores/types";
import { DropDown } from "src/ui/kit/DropDown/DropDown";

interface Props {
  type: BehaviorType;
  availableTypes: BehaviorType[];
  onChange(type: BehaviorType): void;
}

export function BehaviorTypeSelect({ type, availableTypes, onChange }: Props) {
  return (
    <DropDown
      value={{ value: type, key: type }}
      options={Object.values(availableTypes).map((t) => ({ value: t, key: t }))}
      onChange={(v) => onChange(v.value as BehaviorType)}
    />
  );
}
