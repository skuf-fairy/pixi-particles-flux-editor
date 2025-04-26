import { ParticleEmitterConfig, SpawnShapeType } from "particle-flux";

export const RAIN_EMITTER_CONFIG: ParticleEmitterConfig = {
  emitterConfig: {
    spawnInterval: 50,
    spawnParticlesPerWave: 5,
  },
  particleConfig: {
    lifeTime: {
      value: 1000,
    },
    speed: {
      value: 8,
    },
    direction: {
      angle: 65,
    },
    rotation: {
      value: 65,
    },
    spawnShape: {
      type: SpawnShapeType.Rectangle,
      x: -250,
      y: -250,
      width: 500,
      height: 20,
    },
  },
};
