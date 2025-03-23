import React from "react";
import { FPSCounter } from "../FPSCounter/FPSCounter";
import { ParticlesCount } from "../ParticlesCount/ParticlesCount";
import "./InfoPanel.style.scss";

export function InfoPanel() {
  return (
    <div className="info-panel">
      <FPSCounter />
      <ParticlesCount />
    </div>
  );
}
