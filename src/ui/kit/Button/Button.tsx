import cn from "classnames";
import React, { PropsWithChildren } from "react";
import "./Button.style.scss";

export enum ButtonSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

interface Props {
  onClick(): void;
  disabled?: boolean;
  size?: ButtonSize;
  className?: string;
}

export function Button({ children, disabled, size, onClick, className }: PropsWithChildren<Props>) {
  return (
    <button
      disabled={disabled}
      onPointerDown={onClick}
      className={cn("button", { "button--disabled": disabled, [`button--${size}`]: size }, className)}
    >
      {children}
    </button>
  );
}
