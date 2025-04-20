import React from "react";
import { BooleanValue } from "src/ui/components/BooleanValue/BooleanValue";
import { Switch } from "src/ui/kit/Switch/Switch";

interface Props {
  isEnabled: boolean;
  onChange(v: boolean): void;
}

export function BehaviorEnabled({ isEnabled, onChange }: Props) {
  return <Switch checked={isEnabled} onChange={onChange} />;
}
