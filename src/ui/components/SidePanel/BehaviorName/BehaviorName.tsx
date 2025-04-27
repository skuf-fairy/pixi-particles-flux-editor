import React from "react";
import { Typography, TypographyColor, TypographyVariant } from "src/ui/kit/Typography/Typography";

interface Props {
  name: string;
}

export function BehaviorName({ name }: Props) {
  return (
    <Typography color={TypographyColor.PrimaryTitle} variant={TypographyVariant.H3}>
      {name}
    </Typography>
  );
}
