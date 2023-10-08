import React from "react";
import { FPSCounter } from "../components/FPSCounter/FPSCounter";
import "./InfoPanel.style.scss";

export function InfoPanel() {
  return (
    <div className="info-panel">
      <FPSCounter />
    </div>
  );
}
