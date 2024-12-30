import { Checkbox, Typography } from "antd";
import React from "react";
import "./CheckboxOption.style.scss";

interface Props {
  checked: boolean;
  text: string;
  onChange(v: boolean): void;
}

export function CheckboxOption({ checked, text, onChange }: Props) {
  return (
    <Checkbox checked={checked} onChange={(e) => onChange(e.target.value)}>
      <Typography.Text type="secondary">{text}</Typography.Text>
    </Checkbox>
  );
}
