import cn from "classnames";
import React, { PropsWithChildren } from "react";
import "./FieldsGrid.style.scss";

interface Props {
  className?: string;
  columns: number;
}

export function FieldsGrid({ className, columns, children }: PropsWithChildren<Props>) {
  return (
    <div className={cn("fields-grid", className)} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {children}
    </div>
  );
}
