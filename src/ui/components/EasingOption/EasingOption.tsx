import { EasingName } from "particle-flux";
import React from "react";
import { Typography, TypographyVariant } from "src/ui/kit/Typography/Typography";
import { EasingSelect } from "../EasingSelect/EasingSelect";
import "./EasingOption.style.scss";

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
      <EasingSelect value={easing} onChange={(v) => onChange(v)} />
    </div>
  );
}
