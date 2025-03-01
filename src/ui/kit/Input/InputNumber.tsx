import React from "react";
import "./Input.style.scss";

interface Props {
  value: number;
  onChange?(v: number): void;
  onBlur?(v: number): void;
  min?: number;
  max?: number;
  disabled?: boolean;
  placeholder?: string;
}

export function InputNumber({ value, onChange, onBlur, min, max, disabled, placeholder }: Props) {
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
          onChange?.(v);
        }
      }}
      onBlur={(e) => {
        const v = Number(e.target.value);
        if (!isNaN(v)) {
          onBlur?.(v);
        }
      }}
      className="input"
      placeholder={placeholder}
    />
  );
}
