import { VectorBehaviorConfig, isScalarDynamicBehavior } from "particle-flux";
import React from "react";
import { Typography, TypographyColor, TypographyVariant } from "src/ui/kit/Typography/Typography";
import { ScalarDynamicBehaviorOption } from "../ScalarDynamicBehaviorOption/ScalarDynamicBehaviorOption";
import { ScalarStaticBehaviorOption } from "../ScalarStaticBehavior/ScalarStaticBehaviorOption";
import "./VectorBehaviorOption.style.scss";

interface Props {
  config: VectorBehaviorConfig;
  onChange(v: VectorBehaviorConfig): void;
}

export function VectorBehaviorOption({ config, onChange }: Props) {
  return (
    <div className="vector-behavior-option">
      <div className="vector-behavior-option__item">
        <Typography
          color={TypographyColor.PrimaryTitle}
          variant={TypographyVariant.H3}
          className="vector-behavior-option__coordinate"
        >
          X
        </Typography>

        {isScalarDynamicBehavior(config.x) ? (
          <ScalarDynamicBehaviorOption config={config.x} onChange={(v) => onChange({ ...config, x: v })} />
        ) : (
          <ScalarStaticBehaviorOption config={config.x} onChange={(v) => onChange({ ...config, x: v })} />
        )}
      </div>
      <div className="vector-behavior-option__item">
        <Typography
          color={TypographyColor.PrimaryTitle}
          variant={TypographyVariant.H3}
          className="vector-behavior-option__coordinate"
        >
          Y
        </Typography>

        {isScalarDynamicBehavior(config.y) ? (
          <ScalarDynamicBehaviorOption config={config.y} onChange={(v) => onChange({ ...config, y: v })} />
        ) : (
          <ScalarStaticBehaviorOption config={config.y} onChange={(v) => onChange({ ...config, y: v })} />
        )}
      </div>
    </div>
  );
}
