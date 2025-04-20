import React from "react";
import { Typography, TypographyColor, TypographyVariant } from "src/ui/kit/Typography/Typography";
import "./BehaviorName.style.scss";

interface Props {
  name: string;
}

export function BehaviorName({ name }: Props) {
  return (
    <div className="behavior-name">
      <Typography color={TypographyColor.PrimaryTitle} variant={TypographyVariant.H3} className="behavior-name__title">
        {name}
      </Typography>
    </div>
  );
}
