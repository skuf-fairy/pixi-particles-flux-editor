import cn from "classnames";
import React, { PropsWithChildren } from "react";
import "./FieldsGrid.style.scss";

interface Props {
  className?: string;
}

export function FieldsGrid({ className, children }: PropsWithChildren<Props>) {
  return <div className={cn("fields-grid", className)}>{children}</div>;
}
