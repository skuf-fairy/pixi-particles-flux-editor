import cn from "classnames";
import React, { useRef } from "react";
import { Typography, TypographyVariant } from "src/ui/kit/Typography/Typography";
import "./ColorPicker.style.scss";

interface Props {
  onChange(color: string): void;
  color: string;
  className?: string;
}

export function ColorPicker({ color, onChange, className }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={cn("color-picker", className)}>
      <Typography variant={TypographyVariant.P} className="color-picker__hex">
        {color}
      </Typography>

      <input
        ref={inputRef}
        value={color}
        type="color"
        className="color-picker__input"
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
}
