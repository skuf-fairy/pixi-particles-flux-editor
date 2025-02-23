import React from "react";
import "./Input.style.scss";

interface Props {
  value: number;
  onChange(v: number): void;
  min?: number;
  max?: number;
  disabled?: boolean;
  placeholder?: string;
}

export function InputNumber({ value, onChange, min, max, disabled, placeholder }: Props) {
  return (
    <input
      type="number"
      min={min}
      max={max}
      disabled={disabled}
      value={value}
      onChange={(e) => {
        const v = Number(e.target.value);
        if (!isNaN(v)) {
          onChange(v);
        }
      }}
      className="input"
      placeholder={placeholder}
    />
  );
}
