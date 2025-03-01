import React, { PropsWithChildren } from "react";
import { Button } from "../Button/Button";
import { Typography, TypographyVariant } from "../Typography/Typography";
import "./SymbolButton.style.scss";

interface Props {
  onClick: VoidFunction;
  disabled?: boolean;
}

export function SymbolButton({ onClick, disabled, children }: PropsWithChildren<Props>) {
  return (
    <Button className="symbol-button" onClick={onClick} disabled={disabled}>
      <Typography variant={TypographyVariant.H3} className="symbol-button__text">
        {children}
      </Typography>
    </Button>
  );
}
