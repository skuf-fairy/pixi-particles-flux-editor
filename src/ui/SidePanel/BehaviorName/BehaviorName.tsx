import React from "react";
import { Switch } from "src/ui/kit/Switch/Switch";
import { Typography, TypographyVariant } from "src/ui/kit/Typography/Typography";
import "./BehaviorName.style.scss";

interface Props {
  name: string;
  isEnabled?: boolean;
  onEnabledChange?(enabled: boolean): void;
}

export function BehaviorName({ name, isEnabled, onEnabledChange }: Props) {
  return (
    <div className="behavior-name">
      <Typography variant={TypographyVariant.H3} className="behavior-name__title">
        {name}
      </Typography>
      {isEnabled !== undefined && onEnabledChange && (
        <Switch checked={isEnabled} onChange={onEnabledChange} className="behavior-name__switch" />
      )}
    </div>
  );
}
