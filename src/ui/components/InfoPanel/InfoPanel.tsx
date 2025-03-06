import React from "react";
import { FPSCounter } from "../FPSCounter/FPSCounter";
import "./InfoPanel.style.scss";

export function InfoPanel() {
  return (
    <div className="info-panel">
      <FPSCounter />
    </div>
  );
}
