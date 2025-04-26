import { ParticleEmitterConfig } from "particle-flux";

export const TRAIL_EMITTER_CONFIG: ParticleEmitterConfig = {
  emitterConfig: {
    spawnInterval: 25,
    spawnParticlesPerWave: 20,
  },
  particleConfig: {
    lifeTime: {
      min: 250,
      max: 1500,
    },
    alpha: {
      start: 1,
      end: 0.31,
    },
    speed: {
      start: 7,
      end: 5,
    },
    scale: {
      start: 0.25,
      end: 1,
    },
    color: {
      start: "#ffffff",
      end: "#9ff3ff",
    },
    direction: {
      minAngle: -150,
      maxAngle: -30,
      isRotateByDirection: true,
    },
  },
};
