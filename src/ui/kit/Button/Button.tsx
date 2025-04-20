import cn from "classnames";
import React, { PropsWithChildren } from "react";
import "./Button.style.scss";

export enum ButtonStyleType {
  Common = "common",
  Primary = "primary", // зеленая кнопка
}

export enum ButtonSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

interface Props {
  onClick(): void;
  styleType: ButtonStyleType;
  disabled?: boolean;
  size?: ButtonSize;
  className?: string;
}

export function Button({ children, disabled, size, onClick, styleType, className }: PropsWithChildren<Props>) {
  return (
    <button
      disabled={disabled}
      onPointerDown={onClick}
      className={cn(
        "button",
        { "button--disabled": disabled, [`button--${size}`]: size },
        `button--type-${styleType}`,
        className
      )}
    >
      {children}
    </button>
  );
}
