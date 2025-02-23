import React, { useRef } from "react";
import { Typography, TypographyVariant } from "src/ui/kit/Typography/Typography";
import "./ColorPicker.style.scss";

interface Props {
  onChange(color: string): void;
  color: string;
}

export function ColorPicker({ color, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="color-picker">
      <div className="color-picker__input-wrapper">
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

      <Typography variant={TypographyVariant.P}>{color}</Typography>
    </div>
  );
}
