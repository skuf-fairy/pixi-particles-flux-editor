import cn from "classnames";
import React from "react";
import "./Divider.style.scss";

interface Props {
  className?: string;
}

export function Divider({ className }: Props) {
  return <div className={cn("divider", className)} />;
}
