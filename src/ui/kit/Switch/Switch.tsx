import cn from "classnames";
import React from "react";
import "./Switch.style.scss";

interface Props {
  checked: boolean;
  onChange(v: boolean): void;
  className?: string;
}

export function Switch({ checked, onChange, className }: Props) {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={cn("switch", className, { ["switch__checked"]: checked, ["switch__unchecked"]: !checked })}
    >
      <div
        className={cn("switch__slider", {
          ["switch__slider--checked"]: checked,
          ["switch__slider--unchecked"]: !checked,
        })}
      />
    </div>
  );
}
