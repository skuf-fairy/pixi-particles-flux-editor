import { ParticleEmitterConfig, SpawnShapeType } from "particle-flux";

export const BUBBLE_BLOW_EMITTER_CONFIG: ParticleEmitterConfig = {
  emitterConfig: {
    spawnParticlesPerWave: 15,
    maxParticles: 500,
    spawnChance: 100,
    spawnInterval: 1500,
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
      type: SpawnShapeType.Point,
      x: 0,
      y: 0,
    },
    color: {
      value: "#ffffff",
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
