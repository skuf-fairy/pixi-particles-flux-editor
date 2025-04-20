import { ParticleEmitterConfig, SpawnShapeType } from "particle-flux";

export const RAIN_EMITTER_CONFIG: ParticleEmitterConfig = {
  emitterConfig: {
    spawnInterval: 50,
    spawnParticlesPerWave: 5,
  },
  particleConfig: {
    speed: {
      start: 1,
      end: 1.8,
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
