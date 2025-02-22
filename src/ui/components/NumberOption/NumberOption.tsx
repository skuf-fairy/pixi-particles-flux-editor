import React from "react";
import { InputNumber } from "src/ui/kit/Input/InputNumber";
import { Typography, TypographyVariant } from "src/ui/kit/Typography/Typography";
import "./NumberOption.style.scss";

interface Props {
  value: number;
  text: string;
  min?: number;
  max?: number;
  onChange(v: number): void;
}

export function NumberOption({ value, text, min, max, onChange }: Props) {
  return (
    <div className="number-option">
      <Typography variant={TypographyVariant.P} className="number-option__title">
        {text}
      </Typography>
      <InputNumber
        value={value}
        min={min}
        max={max}
        onChange={(e) => {
          onChange(e);
        }}
      />
    </div>
  );
}
