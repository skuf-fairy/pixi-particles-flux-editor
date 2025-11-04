import {ParticleEmitterConfig} from 'particle-flux';

export const BUBBLE_BLOW_EMITTER_CONFIG: ParticleEmitterConfig = {
  emitterConfig: {
    spawnParticlesPerWave: 15,
    maxParticles: 500,
    spawnChance: 100,
    spawnTimeout: 0,
    spawnTime: 0,
    spawnInterval: {
      max: 1500,
      min: 250,
    },
  },
  particleConfig: {
    lifeTime: {
      value: 1400,
    },
    alpha: {
      start: 1,
      end: 0,
      multiplier: 1,
    },
    speed: {
      value: 5,
      multiplier: {
        min: 0.7,
        max: 2,
      },
    },
    scale: {
      value: 0.4,
      multiplier: 1,
    },
    spawnShape: {
      shape: {
        type: 'Rectangle',
        x: -500,
        y: -500,
        width: 1000,
        height: 1000,
      },
      isGroupWave: true,
    },
    color: {
      value: '#ffffff',
    },
    direction: {
      minAngle: -140,
      maxAngle: -40,
    },
    rotation: {
      value: 0,
      multiplier: 1,
    },
    gravity: {
      value: 0.1,
    },
  },
};
