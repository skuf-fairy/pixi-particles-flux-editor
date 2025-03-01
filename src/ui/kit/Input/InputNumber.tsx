import React, { useState } from "react";
import "./Input.style.scss";

interface Props {
  value: number;
  onBlur?(v: number): void;
  min?: number;
  max?: number;
  disabled?: boolean;
  placeholder?: string;
}

export function InputNumber({ value, onBlur, min, max, disabled, placeholder }: Props) {
  const [inputValue, setInputValue] = useState(value.toString());

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
      className="input"
      placeholder={placeholder}
    />
  );
}

function parseFloatNumber(str: string): number | null {
  const regex = /[-+]?[0-9]*\.?[0-9]+/;
  const match = str.match(regex);
  return match ? parseFloat(match[0]) : null;
}
