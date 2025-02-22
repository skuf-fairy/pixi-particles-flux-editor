import { Space } from "antd";
import { EasingName } from "particle-flux";
import React from "react";
import { Typography, TypographyVariant } from "src/ui/kit/Typography/Typography";
import { EasingeSelect } from "../EasingSelect/EasingSelect";

interface Props {
  easing: EasingName;
  onChange(e: EasingName): void;
}

export function EasingOption({ easing, onChange }: Props) {
  return (
    <div className="easing-option">
      <Typography variant={TypographyVariant.P} className="easing-option__title">
        Easing
      </Typography>
      <EasingeSelect value={easing} onChange={(v) => onChange(v)} />
    </div>
  );
}
