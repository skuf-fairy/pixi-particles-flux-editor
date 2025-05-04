import {ParticleEmitterConfig} from 'particle-flux';

export const FOUNTAIN_EMITTER_CONFIG: ParticleEmitterConfig = {
  emitterConfig: {
    spawnInterval: 0.5,
  },
  particleConfig: {
    lifeTime: {
      min: 200,
      max: 450,
    },
    alpha: {
      start: 1,
      end: 0.31,
    },
    speed: {
      start: 10,
      end: 6,
    },
    gravity: {
      value: 0.3,
    },
    scale: {
      start: 0.25,
      end: 1,
    },
    color: {
      start: '#ffffff',
      end: '#9ff3ff',
    },
    direction: {
      minAngle: 260,
      maxAngle: 280,
      isRotateByDirection: true,
    },
  },
};
