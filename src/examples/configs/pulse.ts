import {ParticleEmitterConfig} from 'particle-flux';

export const PULSE_EMITTER_CONFIG: ParticleEmitterConfig = {
  emitterConfig: {spawnInterval: 1000},
  particleConfig: {
    lifeTime: {
      value: 1000,
    },
    scale: {
      start: 0,
      end: 2.5,
    },
    alpha: {
      start: 1,
      end: 0,
    },
  },
};
