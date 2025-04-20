import { ParticleEmitterConfig } from "particle-flux";

export const CARTOON_SMOKE_BLAST_EMITTER_CONFIG: ParticleEmitterConfig = {
  emitterConfig: {
    spawnInterval: 100,
    spawnParticlesPerWave: 10,
  },
  particleConfig: {
    lifeTime: {
      min: 1000,
      max: 2000,
    },
    speed: {
      value: 0.4 * 6,
    },
    direction: {
      minAngle: -70,
      maxAngle: -110,
    },
    scale: {
      start: 0.35,
      end: 1,
    },
  },
};
