import { InputNumber, Space, Typography } from "antd";
import React from "react";
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
      <Typography.Text className="number-option__title" style={{ color: "#023047" }}>
        {text}
      </Typography.Text>
      <InputNumber
        value={value}
        min={min}
        max={max}
        onChange={(e) => {
          if (e !== null) {
            onChange(e);
          }
        }}
      />
    </Space>
  );
}
