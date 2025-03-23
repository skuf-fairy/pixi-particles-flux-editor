import React from "react";
import { usePerformanceStore } from "src/hooks/connectors";
import { Typography, TypographyVariant } from "src/ui/kit/Typography/Typography";
import "./ParticlesCount.style.scss";

export function ParticlesCount() {
  const count = usePerformanceStore().getParticleCount();

  return (
    <Typography variant={TypographyVariant.P} className="particles-count">
      Particles: {count}
    </Typography>
  );
}
