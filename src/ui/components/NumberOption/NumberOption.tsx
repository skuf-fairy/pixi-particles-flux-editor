import cn from "classnames";
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
  className?: string;
}

export function NumberOption({ value, text, min, max, onChange, className }: Props) {
  return (
    <div className={cn("number-option", className)}>
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
