import {ParticleEmitterConfig} from 'particle-flux';

export const BUBBLES_EMITTER_CONFIG: ParticleEmitterConfig = {
  emitterConfig: {
    spawnInterval: 150,
    spawnParticlesPerWave: 4,
  },
  particleConfig: {
    lifeTime: {
      min: 5000,
      max: 7000,
    },
    alpha: {
      start: 1,
      end: 0.2,
    },
    speed: {
      start: 0.25 * 6,
      end: 0,
    },
    direction: {
      minAngle: 0,
      maxAngle: 360,
    },
    scale: {
      start: 0.25,
      end: 0.75,
    },
  },
};
