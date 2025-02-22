import cn from "classnames";
import { PropsWithChildren } from "react";
import React from "react";
import "./ItemContainer.style.scss";

interface Props {
  className?: string;
  isDisabled?: boolean;
}

export function ItemContainer({ className, isDisabled, children }: PropsWithChildren<Props>) {
  return <div className={cn("item-container", className)}>{children}</div>;
}
