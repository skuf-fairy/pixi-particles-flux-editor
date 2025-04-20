import cn from "classnames";
import React, { PropsWithChildren } from "react";
import { Button, ButtonStyleType } from "../Button/Button";
import { Typography, TypographyColor, TypographyVariant } from "../Typography/Typography";
import "./SymbolButton.style.scss";

interface Props {
  onClick: VoidFunction;
  disabled?: boolean;
  className?: string;
}

export function SymbolButton({ onClick, disabled, className, children }: PropsWithChildren<Props>) {
  return (
    <Button
      styleType={ButtonStyleType.Primary}
      className={cn("symbol-button", className)}
      onClick={onClick}
      disabled={disabled}
    >
      <Typography color={TypographyColor.SecondaryText} variant={TypographyVariant.H3} className="symbol-button__text">
        {children}
      </Typography>
    </Button>
  );
}
