import cn from "classnames";
import React, { useEffect, useState } from "react";
import "./Input.style.scss";

interface Props {
  value: number;
  onBlur?(v: number): void;
  min?: number;
  max?: number;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export function InputNumber({ value, onBlur, min, max, disabled, placeholder, className }: Props) {
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    const currentValue = parseFloatNumber(inputValue);
    if (currentValue !== null && currentValue !== value) {
      const clampedValue = Math.min(Math.max(value, min ?? -Infinity), max ?? Infinity);
      setInputValue(clampedValue.toString());
    }
  }, [value]);

  return (
    <input
      type="string"
      disabled={disabled}
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value);
      }}
      onBlur={() => {
        const v = parseFloatNumber(inputValue);

        if (v !== null) {
          const clampedValue = Math.min(Math.max(v, min ?? -Infinity), max ?? Infinity);
          onBlur?.(clampedValue);
          setInputValue(clampedValue.toString());
        }
      }}
      className={cn("input", className)}
      placeholder={placeholder}
    />
  );
}

function parseFloatNumber(str: string): number | null {
  const regex = /[-+]?[0-9]*\.?[0-9]+/;
  const match = str.match(regex);
  return match ? parseFloat(match[0]) : null;
}
