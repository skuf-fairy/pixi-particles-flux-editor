import { Space, Typography } from "antd";
import React from "react";
import { InputNumber } from "src/ui/kit/Input/InputNumber";
import "./NumberOption.style.scss";

interface Props {
  value: number;
  text: string;
  min?: number;
  max?: number;
  onChange(v: number): void;
}

export function NumberOption({ value, text, min, max, onChange }: Props) {
  return (
    <Space direction="vertical">
      <Typography.Text className="number-option__title" style={{ color: "var(--title-color)" }}>
        {text}
      </Typography.Text>
      <InputNumber
        value={value}
        min={min}
        max={max}
        onChange={(e) => {
          onChange(e);
        }}
      />
    </Space>
  );
}
