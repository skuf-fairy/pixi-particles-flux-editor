import { Typography } from "antd";
import { Switch } from "antd";
import React from "react";
import "./BehaviorName.style.scss";

interface Props {
  name: string;
  isEnabled?: boolean;
  onEnabledChange?(enabled: boolean): void;
}

export function BehaviorName({ name, isEnabled, onEnabledChange }: Props) {
  return (
    <div className="behavior-name">
      <Typography.Title level={3} style={{ color: "white" }}>
        {name}
      </Typography.Title>
      {isEnabled !== undefined && (
        <Switch defaultChecked={isEnabled} onChange={onEnabledChange} className="behavior-name__switch" />
      )}
    </div>
  );
}
