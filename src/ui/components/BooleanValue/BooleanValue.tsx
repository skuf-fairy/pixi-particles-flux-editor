import cn from "classnames";
import React from "react";
import { Switch } from "src/ui/kit/Switch/Switch";
import { Typography, TypographyColor, TypographyVariant } from "src/ui/kit/Typography/Typography";
import "./BooleanValue.style.scss";

interface Props {
  label: string;
  checked: boolean;
  onChange(v: boolean): void;
  className?: string;
}

export function BooleanValue({ checked, label, onChange, className }: Props) {
  return (
    <div className={cn("boolean-value", className)}>
      <Typography color={TypographyColor.PrimaryText} variant={TypographyVariant.P} className="boolean-value__label">
        {label}
      </Typography>
      <Switch checked={checked} onChange={onChange} />
    </div>
  );
}
