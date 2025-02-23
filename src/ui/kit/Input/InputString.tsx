import React from "react";
import "./Input.style.scss";

interface Props {
  value: string;
  onChange(v: string): void;
  disabled?: boolean;
  placeholder?: string;
}

export function InputString({ value, onChange, disabled, placeholder }: Props) {
  return (
    <input
      type="string"
      disabled={disabled}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      className="input"
      placeholder={placeholder}
    />
  );
}
