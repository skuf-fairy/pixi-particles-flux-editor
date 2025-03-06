import React, { ReactNode } from "react";
import "./BehaviorHeader.style.scss";

interface Props {
  left: ReactNode;
  right: ReactNode;
}

export function BehaviorHeader({ left, right }: Props) {
  return (
    <div className="behavior-header">
      <div className="behavior-header__left">{left}</div>
      <div className="behavior-header__right">{right}</div>
    </div>
  );
}
