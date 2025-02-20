import { Space, Typography } from "antd";
import { EasingName } from "particle-flux";
import { config } from "process";
import React from "react";
import { EasingeSelect } from "../EasingSelect/EasingSelect";

interface Props {
  easing: EasingName;
  onChange(e: EasingName): void;
}

export function EasingOption({ easing, onChange }: Props) {
  return (
    <Space direction="vertical">
      <Typography.Text className="number-option__title" style={{ color: "var(--title-color)" }}>
        Easing
      </Typography.Text>
      <EasingeSelect value={easing} onChange={(v) => onChange(v)} />
    </Space>
  );
}
