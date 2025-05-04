import {ParticleEmitterConfig} from 'particle-flux';

export const BUBBLES_PATH_EMITTER_CONFIG: ParticleEmitterConfig = {
  emitterConfig: {
    spawnInterval: 550,
  },
  particleConfig: {
    lifeTime: {
      min: 10000,
      max: 15000,
    },
    alpha: {
      start: 1,
      end: 0.2,
    },
    speed: {
      value: 0.04 * 6,
    },
    direction: {
      angle: -90,
    },
    path: {
      path: 'sin(x/10)*35',
    },
    scale: {
      value: 0.35,
    },
  },
};
