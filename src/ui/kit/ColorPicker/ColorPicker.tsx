import cn from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Typography, TypographyVariant } from "src/ui/kit/Typography/Typography";
import "./ColorPicker.style.scss";

interface Props {
  onChange(color: string): void;
  color: string;
  className?: string;
}

export function ColorPicker({ color, onChange, className }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentColor, setCurrentColor] = useState(color);

  useEffect(() => {
    setCurrentColor(color);
  }, [color]);

  return (
    <div className={cn("color-picker", className)}>
      <Typography variant={TypographyVariant.P} className="color-picker__hex">
        {color}
      </Typography>

      <input
        ref={inputRef}
        value={currentColor}
        type="color"
        className="color-picker__input"
        onChange={(e) => {
          setCurrentColor(e.target.value);
        }}
        onBlur={() => {
          onChange(currentColor);
        }}
      />
    </div>
  );
}
