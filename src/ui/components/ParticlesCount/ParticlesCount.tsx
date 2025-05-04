import React from 'react';

import {usePerformanceStore} from 'src/hooks/connectors';
import {Typography, TypographyColor, TypographyVariant} from 'src/ui/kit/Typography/Typography';

export function ParticlesCount() {
  const count = usePerformanceStore().getParticleCount();

  return (
    <Typography color={TypographyColor.PrimaryText} variant={TypographyVariant.P} className="particles-count">
      Particles: {count}
    </Typography>
  );
}
